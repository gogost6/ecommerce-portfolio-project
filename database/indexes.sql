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