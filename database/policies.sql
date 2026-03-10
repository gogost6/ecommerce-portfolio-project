

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