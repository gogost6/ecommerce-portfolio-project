drop extension if exists "pg_net";

create type "public"."color_source" as enum ('99COLORS_NET', 'ART_PAINTS_YG07S', 'BYRNE', 'CRAYOLA', 'CMYK_COLOR_MODEL', 'COLORCODE_IS', 'COLORHEXA', 'COLORXS', 'CORNELL_UNIVERSITY', 'COLUMBIA_UNIVERSITY', 'DUKE_UNIVERSITY', 'ENCYCOLORPEDIA_COM', 'ETON_COLLEGE', 'FANTETTI_AND_PETRACCHI', 'FINDTHEDATA_COM', 'FERRARIO_1919', 'FEDERAL_STANDARD_595', 'FLAG_OF_INDIA', 'FLAG_OF_SOUTH_AFRICA', 'GLAZEBROOK_AND_BALDRY', 'GOOGLE', 'HEXCOLOR_CO', 'ISCC_NBS', 'KELLY_MOORE', 'MATTEL', 'MAERZ_AND_PAUL', 'MILK_PAINT', 'MUNSELL_COLOR_WHEEL', 'NATURAL_COLOR_SYSTEM', 'PANTONE', 'PLOCHERE', 'POURPRE_COM', 'RAL', 'RESENE', 'RGB_COLOR_MODEL', 'THOM_POOLE', 'UNIVERSITY_OF_ALABAMA', 'UNIVERSITY_OF_CALIFORNIA_DAVIS', 'UNIVERSITY_OF_CAMBRIDGE', 'UNIVERSITY_OF_NORTH_CAROLINA', 'UNIVERSITY_OF_TEXAS_AT_AUSTIN', 'X11_WEB', 'XONA_COM');


  create table "public"."cart_items" (
    "id" bigint generated always as identity not null,
    "cart_id" uuid not null,
    "product_variant_id" bigint not null,
    "quantity" integer not null default 1,
    "price_at_time" numeric not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."cart_items" enable row level security;


  create table "public"."carts" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "session_id" text,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."carts" enable row level security;


  create table "public"."categories" (
    "id" bigint generated always as identity not null,
    "name" text not null,
    "slug" text not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."categories" enable row level security;


  create table "public"."colors" (
    "id" bigint generated always as identity not null,
    "name" text not null,
    "slug" text not null,
    "hex" text not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."colors" enable row level security;


  create table "public"."product_images" (
    "id" bigint generated always as identity not null,
    "product_id" bigint not null,
    "url" text not null,
    "alt" text,
    "sort_order" integer not null default 0,
    "is_primary" boolean not null default false,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."product_images" enable row level security;


  create table "public"."product_reviews" (
    "id" bigint generated always as identity not null,
    "product_id" bigint not null,
    "reviewer_name" text,
    "reviewer_email" text,
    "rating" integer not null,
    "body" text,
    "is_verified_purchase" boolean not null default false,
    "is_published" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "user_id" uuid not null
      );


alter table "public"."product_reviews" enable row level security;


  create table "public"."product_types" (
    "id" bigint generated always as identity not null,
    "name" text not null,
    "slug" text not null,
    "description" text,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."product_types" enable row level security;


  create table "public"."product_variants" (
    "id" bigint generated always as identity not null,
    "product_id" bigint not null,
    "size_id" bigint,
    "color_id" bigint,
    "sku" text,
    "barcode" text,
    "price" numeric not null default 0,
    "discounted_price" numeric,
    "percent_discount" numeric,
    "stock" integer not null default 0,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."product_variants" enable row level security;


  create table "public"."products" (
    "id" bigint generated always as identity not null,
    "title" text not null,
    "slug" text not null,
    "description" text,
    "rating" numeric(2,1) not null default 0,
    "is_active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "price" numeric(10,2) not null default 0,
    "discounted_price" numeric(10,2) default NULL::numeric,
    "percent_discount" numeric(5,2) default NULL::numeric,
    "gender" text not null default ''::text,
    "product_type_id" bigint not null,
    "category_type_id" bigint not null
      );


alter table "public"."products" enable row level security;


  create table "public"."sizes" (
    "id" bigint generated always as identity not null,
    "name" text not null,
    "slug" text not null,
    "sort_order" integer not null default 0,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."sizes" enable row level security;


  create table "public"."testimonials" (
    "id" bigint generated always as identity not null,
    "name" character varying(100) not null,
    "rating" integer not null,
    "description" character varying(300) not null,
    "is_verified" boolean not null default true,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."testimonials" enable row level security;

CREATE INDEX cart_items_cart_id_idx ON public.cart_items USING btree (cart_id);

CREATE UNIQUE INDEX cart_items_pkey ON public.cart_items USING btree (id);

CREATE UNIQUE INDEX cart_items_unique_variant_per_cart ON public.cart_items USING btree (cart_id, product_variant_id);

CREATE INDEX cart_items_variant_id_idx ON public.cart_items USING btree (product_variant_id);

CREATE UNIQUE INDEX carts_pkey ON public.carts USING btree (id);

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX categories_slug_key ON public.categories USING btree (slug);

CREATE UNIQUE INDEX colors_pkey ON public.colors USING btree (id);

CREATE UNIQUE INDEX colors_slug_key ON public.colors USING btree (slug);

CREATE UNIQUE INDEX product_images_one_primary_per_product ON public.product_images USING btree (product_id) WHERE (is_primary = true);

CREATE UNIQUE INDEX product_images_pkey ON public.product_images USING btree (id);

CREATE UNIQUE INDEX product_reviews_pkey ON public.product_reviews USING btree (id);

CREATE INDEX product_reviews_product_id_created_at_idx ON public.product_reviews USING btree (product_id, created_at DESC);

CREATE INDEX product_reviews_product_id_idx ON public.product_reviews USING btree (product_id);

CREATE INDEX product_reviews_product_id_is_published_idx ON public.product_reviews USING btree (product_id, is_published);

CREATE UNIQUE INDEX product_types_pkey ON public.product_types USING btree (id);

CREATE UNIQUE INDEX product_types_slug_key ON public.product_types USING btree (slug);

CREATE INDEX product_variants_color_id_idx ON public.product_variants USING btree (color_id);

CREATE UNIQUE INDEX product_variants_pkey ON public.product_variants USING btree (id);

CREATE INDEX product_variants_product_id_idx ON public.product_variants USING btree (product_id);

CREATE INDEX product_variants_size_id_idx ON public.product_variants USING btree (size_id);

CREATE UNIQUE INDEX product_variants_sku_key ON public.product_variants USING btree (sku);

CREATE UNIQUE INDEX product_variants_unique_combo ON public.product_variants USING btree (product_id, size_id, color_id);

CREATE UNIQUE INDEX products_pkey ON public.products USING btree (id);

CREATE UNIQUE INDEX products_slug_key ON public.products USING btree (slug);

CREATE UNIQUE INDEX sizes_pkey ON public.sizes USING btree (id);

CREATE UNIQUE INDEX sizes_slug_key ON public.sizes USING btree (slug);

CREATE UNIQUE INDEX testimonials_pkey ON public.testimonials USING btree (id);

alter table "public"."cart_items" add constraint "cart_items_pkey" PRIMARY KEY using index "cart_items_pkey";

alter table "public"."carts" add constraint "carts_pkey" PRIMARY KEY using index "carts_pkey";

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."colors" add constraint "colors_pkey" PRIMARY KEY using index "colors_pkey";

alter table "public"."product_images" add constraint "product_images_pkey" PRIMARY KEY using index "product_images_pkey";

alter table "public"."product_reviews" add constraint "product_reviews_pkey" PRIMARY KEY using index "product_reviews_pkey";

alter table "public"."product_types" add constraint "product_types_pkey" PRIMARY KEY using index "product_types_pkey";

alter table "public"."product_variants" add constraint "product_variants_pkey" PRIMARY KEY using index "product_variants_pkey";

alter table "public"."products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

alter table "public"."sizes" add constraint "sizes_pkey" PRIMARY KEY using index "sizes_pkey";

alter table "public"."testimonials" add constraint "testimonials_pkey" PRIMARY KEY using index "testimonials_pkey";

alter table "public"."cart_items" add constraint "cart_items_cart_id_fkey" FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE not valid;

alter table "public"."cart_items" validate constraint "cart_items_cart_id_fkey";

alter table "public"."cart_items" add constraint "cart_items_quantity_check" CHECK ((quantity > 0)) not valid;

alter table "public"."cart_items" validate constraint "cart_items_quantity_check";

alter table "public"."cart_items" add constraint "cart_items_variant_id_fkey" FOREIGN KEY (product_variant_id) REFERENCES public.product_variants(id) ON DELETE CASCADE not valid;

alter table "public"."cart_items" validate constraint "cart_items_variant_id_fkey";

alter table "public"."carts" add constraint "carts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."carts" validate constraint "carts_user_id_fkey";

alter table "public"."categories" add constraint "categories_slug_key" UNIQUE using index "categories_slug_key";

alter table "public"."colors" add constraint "colors_slug_key" UNIQUE using index "colors_slug_key";

alter table "public"."product_images" add constraint "product_images_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE not valid;

alter table "public"."product_images" validate constraint "product_images_product_id_fkey";

alter table "public"."product_reviews" add constraint "product_reviews_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE not valid;

alter table "public"."product_reviews" validate constraint "product_reviews_product_id_fkey";

alter table "public"."product_reviews" add constraint "product_reviews_rating_check" CHECK (((rating >= 1) AND (rating <= 5))) not valid;

alter table "public"."product_reviews" validate constraint "product_reviews_rating_check";

alter table "public"."product_reviews" add constraint "product_reviews_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."product_reviews" validate constraint "product_reviews_user_id_fkey";

alter table "public"."product_types" add constraint "product_types_slug_key" UNIQUE using index "product_types_slug_key";

alter table "public"."product_variants" add constraint "product_variants_color_id_fkey" FOREIGN KEY (color_id) REFERENCES public.colors(id) not valid;

alter table "public"."product_variants" validate constraint "product_variants_color_id_fkey";

alter table "public"."product_variants" add constraint "product_variants_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE not valid;

alter table "public"."product_variants" validate constraint "product_variants_product_id_fkey";

alter table "public"."product_variants" add constraint "product_variants_size_id_fkey" FOREIGN KEY (size_id) REFERENCES public.sizes(id) not valid;

alter table "public"."product_variants" validate constraint "product_variants_size_id_fkey";

alter table "public"."product_variants" add constraint "product_variants_sku_key" UNIQUE using index "product_variants_sku_key";

alter table "public"."product_variants" add constraint "product_variants_stock_check" CHECK ((stock >= 0)) not valid;

alter table "public"."product_variants" validate constraint "product_variants_stock_check";

alter table "public"."products" add constraint "product_gender_check" CHECK ((gender = ANY (ARRAY['men'::text, 'women'::text]))) not valid;

alter table "public"."products" validate constraint "product_gender_check";

alter table "public"."products" add constraint "products_category_type_id_fkey" FOREIGN KEY (category_type_id) REFERENCES public.categories(id) not valid;

alter table "public"."products" validate constraint "products_category_type_id_fkey";

alter table "public"."products" add constraint "products_product_type_id_fkey" FOREIGN KEY (product_type_id) REFERENCES public.product_types(id) ON DELETE SET NULL not valid;

alter table "public"."products" validate constraint "products_product_type_id_fkey";

alter table "public"."products" add constraint "products_rating_range" CHECK (((rating >= (0)::numeric) AND (rating <= (5)::numeric))) not valid;

alter table "public"."products" validate constraint "products_rating_range";

alter table "public"."products" add constraint "products_slug_key" UNIQUE using index "products_slug_key";

alter table "public"."sizes" add constraint "sizes_slug_key" UNIQUE using index "sizes_slug_key";

alter table "public"."testimonials" add constraint "testimonials_rating_check" CHECK (((rating >= 1) AND (rating <= 5))) not valid;

alter table "public"."testimonials" validate constraint "testimonials_rating_check";

set check_function_bodies = off;

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

grant delete on table "public"."cart_items" to "anon";

grant insert on table "public"."cart_items" to "anon";

grant references on table "public"."cart_items" to "anon";

grant select on table "public"."cart_items" to "anon";

grant trigger on table "public"."cart_items" to "anon";

grant truncate on table "public"."cart_items" to "anon";

grant update on table "public"."cart_items" to "anon";

grant delete on table "public"."cart_items" to "authenticated";

grant insert on table "public"."cart_items" to "authenticated";

grant references on table "public"."cart_items" to "authenticated";

grant select on table "public"."cart_items" to "authenticated";

grant trigger on table "public"."cart_items" to "authenticated";

grant truncate on table "public"."cart_items" to "authenticated";

grant update on table "public"."cart_items" to "authenticated";

grant delete on table "public"."cart_items" to "service_role";

grant insert on table "public"."cart_items" to "service_role";

grant references on table "public"."cart_items" to "service_role";

grant select on table "public"."cart_items" to "service_role";

grant trigger on table "public"."cart_items" to "service_role";

grant truncate on table "public"."cart_items" to "service_role";

grant update on table "public"."cart_items" to "service_role";

grant delete on table "public"."carts" to "anon";

grant insert on table "public"."carts" to "anon";

grant references on table "public"."carts" to "anon";

grant select on table "public"."carts" to "anon";

grant trigger on table "public"."carts" to "anon";

grant truncate on table "public"."carts" to "anon";

grant update on table "public"."carts" to "anon";

grant delete on table "public"."carts" to "authenticated";

grant insert on table "public"."carts" to "authenticated";

grant references on table "public"."carts" to "authenticated";

grant select on table "public"."carts" to "authenticated";

grant trigger on table "public"."carts" to "authenticated";

grant truncate on table "public"."carts" to "authenticated";

grant update on table "public"."carts" to "authenticated";

grant delete on table "public"."carts" to "service_role";

grant insert on table "public"."carts" to "service_role";

grant references on table "public"."carts" to "service_role";

grant select on table "public"."carts" to "service_role";

grant trigger on table "public"."carts" to "service_role";

grant truncate on table "public"."carts" to "service_role";

grant update on table "public"."carts" to "service_role";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."colors" to "anon";

grant insert on table "public"."colors" to "anon";

grant references on table "public"."colors" to "anon";

grant select on table "public"."colors" to "anon";

grant trigger on table "public"."colors" to "anon";

grant truncate on table "public"."colors" to "anon";

grant update on table "public"."colors" to "anon";

grant delete on table "public"."colors" to "authenticated";

grant insert on table "public"."colors" to "authenticated";

grant references on table "public"."colors" to "authenticated";

grant select on table "public"."colors" to "authenticated";

grant trigger on table "public"."colors" to "authenticated";

grant truncate on table "public"."colors" to "authenticated";

grant update on table "public"."colors" to "authenticated";

grant delete on table "public"."colors" to "service_role";

grant insert on table "public"."colors" to "service_role";

grant references on table "public"."colors" to "service_role";

grant select on table "public"."colors" to "service_role";

grant trigger on table "public"."colors" to "service_role";

grant truncate on table "public"."colors" to "service_role";

grant update on table "public"."colors" to "service_role";

grant delete on table "public"."product_images" to "anon";

grant insert on table "public"."product_images" to "anon";

grant references on table "public"."product_images" to "anon";

grant select on table "public"."product_images" to "anon";

grant trigger on table "public"."product_images" to "anon";

grant truncate on table "public"."product_images" to "anon";

grant update on table "public"."product_images" to "anon";

grant delete on table "public"."product_images" to "authenticated";

grant insert on table "public"."product_images" to "authenticated";

grant references on table "public"."product_images" to "authenticated";

grant select on table "public"."product_images" to "authenticated";

grant trigger on table "public"."product_images" to "authenticated";

grant truncate on table "public"."product_images" to "authenticated";

grant update on table "public"."product_images" to "authenticated";

grant delete on table "public"."product_images" to "service_role";

grant insert on table "public"."product_images" to "service_role";

grant references on table "public"."product_images" to "service_role";

grant select on table "public"."product_images" to "service_role";

grant trigger on table "public"."product_images" to "service_role";

grant truncate on table "public"."product_images" to "service_role";

grant update on table "public"."product_images" to "service_role";

grant delete on table "public"."product_reviews" to "anon";

grant insert on table "public"."product_reviews" to "anon";

grant references on table "public"."product_reviews" to "anon";

grant select on table "public"."product_reviews" to "anon";

grant trigger on table "public"."product_reviews" to "anon";

grant truncate on table "public"."product_reviews" to "anon";

grant update on table "public"."product_reviews" to "anon";

grant delete on table "public"."product_reviews" to "authenticated";

grant insert on table "public"."product_reviews" to "authenticated";

grant references on table "public"."product_reviews" to "authenticated";

grant select on table "public"."product_reviews" to "authenticated";

grant trigger on table "public"."product_reviews" to "authenticated";

grant truncate on table "public"."product_reviews" to "authenticated";

grant update on table "public"."product_reviews" to "authenticated";

grant delete on table "public"."product_reviews" to "service_role";

grant insert on table "public"."product_reviews" to "service_role";

grant references on table "public"."product_reviews" to "service_role";

grant select on table "public"."product_reviews" to "service_role";

grant trigger on table "public"."product_reviews" to "service_role";

grant truncate on table "public"."product_reviews" to "service_role";

grant update on table "public"."product_reviews" to "service_role";

grant delete on table "public"."product_types" to "anon";

grant insert on table "public"."product_types" to "anon";

grant references on table "public"."product_types" to "anon";

grant select on table "public"."product_types" to "anon";

grant trigger on table "public"."product_types" to "anon";

grant truncate on table "public"."product_types" to "anon";

grant update on table "public"."product_types" to "anon";

grant delete on table "public"."product_types" to "authenticated";

grant insert on table "public"."product_types" to "authenticated";

grant references on table "public"."product_types" to "authenticated";

grant select on table "public"."product_types" to "authenticated";

grant trigger on table "public"."product_types" to "authenticated";

grant truncate on table "public"."product_types" to "authenticated";

grant update on table "public"."product_types" to "authenticated";

grant delete on table "public"."product_types" to "service_role";

grant insert on table "public"."product_types" to "service_role";

grant references on table "public"."product_types" to "service_role";

grant select on table "public"."product_types" to "service_role";

grant trigger on table "public"."product_types" to "service_role";

grant truncate on table "public"."product_types" to "service_role";

grant update on table "public"."product_types" to "service_role";

grant delete on table "public"."product_variants" to "anon";

grant insert on table "public"."product_variants" to "anon";

grant references on table "public"."product_variants" to "anon";

grant select on table "public"."product_variants" to "anon";

grant trigger on table "public"."product_variants" to "anon";

grant truncate on table "public"."product_variants" to "anon";

grant update on table "public"."product_variants" to "anon";

grant delete on table "public"."product_variants" to "authenticated";

grant insert on table "public"."product_variants" to "authenticated";

grant references on table "public"."product_variants" to "authenticated";

grant select on table "public"."product_variants" to "authenticated";

grant trigger on table "public"."product_variants" to "authenticated";

grant truncate on table "public"."product_variants" to "authenticated";

grant update on table "public"."product_variants" to "authenticated";

grant delete on table "public"."product_variants" to "service_role";

grant insert on table "public"."product_variants" to "service_role";

grant references on table "public"."product_variants" to "service_role";

grant select on table "public"."product_variants" to "service_role";

grant trigger on table "public"."product_variants" to "service_role";

grant truncate on table "public"."product_variants" to "service_role";

grant update on table "public"."product_variants" to "service_role";

grant delete on table "public"."products" to "anon";

grant insert on table "public"."products" to "anon";

grant references on table "public"."products" to "anon";

grant select on table "public"."products" to "anon";

grant trigger on table "public"."products" to "anon";

grant truncate on table "public"."products" to "anon";

grant update on table "public"."products" to "anon";

grant delete on table "public"."products" to "authenticated";

grant insert on table "public"."products" to "authenticated";

grant references on table "public"."products" to "authenticated";

grant select on table "public"."products" to "authenticated";

grant trigger on table "public"."products" to "authenticated";

grant truncate on table "public"."products" to "authenticated";

grant update on table "public"."products" to "authenticated";

grant delete on table "public"."products" to "service_role";

grant insert on table "public"."products" to "service_role";

grant references on table "public"."products" to "service_role";

grant select on table "public"."products" to "service_role";

grant trigger on table "public"."products" to "service_role";

grant truncate on table "public"."products" to "service_role";

grant update on table "public"."products" to "service_role";

grant delete on table "public"."sizes" to "anon";

grant insert on table "public"."sizes" to "anon";

grant references on table "public"."sizes" to "anon";

grant select on table "public"."sizes" to "anon";

grant trigger on table "public"."sizes" to "anon";

grant truncate on table "public"."sizes" to "anon";

grant update on table "public"."sizes" to "anon";

grant delete on table "public"."sizes" to "authenticated";

grant insert on table "public"."sizes" to "authenticated";

grant references on table "public"."sizes" to "authenticated";

grant select on table "public"."sizes" to "authenticated";

grant trigger on table "public"."sizes" to "authenticated";

grant truncate on table "public"."sizes" to "authenticated";

grant update on table "public"."sizes" to "authenticated";

grant delete on table "public"."sizes" to "service_role";

grant insert on table "public"."sizes" to "service_role";

grant references on table "public"."sizes" to "service_role";

grant select on table "public"."sizes" to "service_role";

grant trigger on table "public"."sizes" to "service_role";

grant truncate on table "public"."sizes" to "service_role";

grant update on table "public"."sizes" to "service_role";

grant delete on table "public"."testimonials" to "anon";

grant insert on table "public"."testimonials" to "anon";

grant references on table "public"."testimonials" to "anon";

grant select on table "public"."testimonials" to "anon";

grant trigger on table "public"."testimonials" to "anon";

grant truncate on table "public"."testimonials" to "anon";

grant update on table "public"."testimonials" to "anon";

grant delete on table "public"."testimonials" to "authenticated";

grant insert on table "public"."testimonials" to "authenticated";

grant references on table "public"."testimonials" to "authenticated";

grant select on table "public"."testimonials" to "authenticated";

grant trigger on table "public"."testimonials" to "authenticated";

grant truncate on table "public"."testimonials" to "authenticated";

grant update on table "public"."testimonials" to "authenticated";

grant delete on table "public"."testimonials" to "service_role";

grant insert on table "public"."testimonials" to "service_role";

grant references on table "public"."testimonials" to "service_role";

grant select on table "public"."testimonials" to "service_role";

grant trigger on table "public"."testimonials" to "service_role";

grant truncate on table "public"."testimonials" to "service_role";

grant update on table "public"."testimonials" to "service_role";


  create policy "cart_items_delete_own"
  on "public"."cart_items"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM public.carts c
  WHERE ((c.id = cart_items.cart_id) AND (((c.user_id IS NOT NULL) AND (c.user_id = auth.uid())) OR ((c.user_id IS NULL) AND (c.session_id IS NOT NULL) AND (c.session_id = public.cart_session_id())))))));



  create policy "cart_items_insert_own"
  on "public"."cart_items"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.carts c
  WHERE ((c.id = cart_items.cart_id) AND (((c.user_id IS NOT NULL) AND (c.user_id = auth.uid())) OR ((c.user_id IS NULL) AND (c.session_id IS NOT NULL) AND (c.session_id = public.cart_session_id())))))));



  create policy "cart_items_select_own"
  on "public"."cart_items"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.carts c
  WHERE ((c.id = cart_items.cart_id) AND (((c.user_id IS NOT NULL) AND (c.user_id = auth.uid())) OR ((c.user_id IS NULL) AND (c.session_id IS NOT NULL) AND (c.session_id = public.cart_session_id())))))));



  create policy "cart_items_update_own"
  on "public"."cart_items"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.carts c
  WHERE ((c.id = cart_items.cart_id) AND (((c.user_id IS NOT NULL) AND (c.user_id = auth.uid())) OR ((c.user_id IS NULL) AND (c.session_id IS NOT NULL) AND (c.session_id = public.cart_session_id())))))))
with check ((EXISTS ( SELECT 1
   FROM public.carts c
  WHERE ((c.id = cart_items.cart_id) AND (((c.user_id IS NOT NULL) AND (c.user_id = auth.uid())) OR ((c.user_id IS NULL) AND (c.session_id IS NOT NULL) AND (c.session_id = public.cart_session_id())))))));



  create policy "carts_delete_own"
  on "public"."carts"
  as permissive
  for delete
  to public
using (((user_id = auth.uid()) OR ((user_id IS NULL) AND (session_id = public.cart_session_id()))));



  create policy "carts_insert_own"
  on "public"."carts"
  as permissive
  for insert
  to public
with check (((user_id = auth.uid()) OR ((user_id IS NULL) AND (session_id = public.cart_session_id()))));



  create policy "carts_select_own"
  on "public"."carts"
  as permissive
  for select
  to public
using (((user_id = auth.uid()) OR ((user_id IS NULL) AND (session_id = public.cart_session_id()))));



  create policy "carts_update_own"
  on "public"."carts"
  as permissive
  for update
  to public
using (((user_id = auth.uid()) OR ((user_id IS NULL) AND (session_id = public.cart_session_id()))))
with check (((user_id = auth.uid()) OR ((user_id IS NULL) AND (session_id = public.cart_session_id()))));



  create policy "Enable read access for all users"
  on "public"."categories"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."colors"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."product_images"
  as permissive
  for select
  to public
using (true);



  create policy "Enable insert for authenticated users only"
  on "public"."product_reviews"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Enable read access for all users"
  on "public"."product_reviews"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."product_types"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."product_variants"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."products"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."sizes"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."testimonials"
  as permissive
  for select
  to public
using (true);


CREATE TRIGGER trg_set_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


