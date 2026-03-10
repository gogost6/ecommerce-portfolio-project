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