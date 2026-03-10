CREATE OR REPLACE FUNCTION public.add_to_cart(p_variant_id bigint, p_qty integer DEFAULT 1)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
declare
  v_cart_id uuid;
  v_price numeric;
begin
  if p_qty is null or p_qty <= 0 then
    raise exception 'qty must be > 0';
  end if;

  -- Find existing active cart (user or session)
  select c.id
  into v_cart_id
  from public.carts c
  where c.is_active = true
    and (
      (c.user_id is not null and c.user_id = auth.uid())
      or
      (c.user_id is null and c.session_id is not null and c.session_id = public.cart_session_id())
    )
  limit 1;

  -- Create cart if not exists
  if v_cart_id is null then
    insert into public.carts (user_id, session_id, is_active)
    values (auth.uid(), public.cart_session_id(), true)
    returning id into v_cart_id;
  end if;

  -- Price snapshot
  select coalesce(pv.discounted_price, pv.price)
  into v_price
  from public.product_variants pv
  where pv.id = p_variant_id;

  if v_price is null then
    raise exception 'variant not found';
  end if;

  -- Upsert item (increment qty)
  insert into public.cart_items (cart_id, product_variant_id, quantity, price_at_time)
  values (v_cart_id, p_variant_id, p_qty, v_price)
  on conflict (cart_id, product_variant_id)
  do update set
    quantity = public.cart_items.quantity + excluded.quantity,
    updated_at = now();
end;
$function$
;

CREATE OR REPLACE FUNCTION public.cart_session_id()
 RETURNS text
 LANGUAGE sql
 STABLE
AS $function$
  select nullif(
    (current_setting('request.headers', true)::json ->> 'x-cart-session'),
    ''
  )
$function$
;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
 RETURNS event_trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$
;