import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  check,
  foreignKey,
  index,
  integer,
  numeric,
  pgEnum,
  pgPolicy,
  pgSchema,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const auth = pgSchema("auth");

export const users = auth.table("users", {
  id: uuid("id").primaryKey(),
});

export const colorSource = pgEnum("color_source", [
  "99COLORS_NET",
  "ART_PAINTS_YG07S",
  "BYRNE",
  "CRAYOLA",
  "CMYK_COLOR_MODEL",
  "COLORCODE_IS",
  "COLORHEXA",
  "COLORXS",
  "CORNELL_UNIVERSITY",
  "COLUMBIA_UNIVERSITY",
  "DUKE_UNIVERSITY",
  "ENCYCOLORPEDIA_COM",
  "ETON_COLLEGE",
  "FANTETTI_AND_PETRACCHI",
  "FINDTHEDATA_COM",
  "FERRARIO_1919",
  "FEDERAL_STANDARD_595",
  "FLAG_OF_INDIA",
  "FLAG_OF_SOUTH_AFRICA",
  "GLAZEBROOK_AND_BALDRY",
  "GOOGLE",
  "HEXCOLOR_CO",
  "ISCC_NBS",
  "KELLY_MOORE",
  "MATTEL",
  "MAERZ_AND_PAUL",
  "MILK_PAINT",
  "MUNSELL_COLOR_WHEEL",
  "NATURAL_COLOR_SYSTEM",
  "PANTONE",
  "PLOCHERE",
  "POURPRE_COM",
  "RAL",
  "RESENE",
  "RGB_COLOR_MODEL",
  "THOM_POOLE",
  "UNIVERSITY_OF_ALABAMA",
  "UNIVERSITY_OF_CALIFORNIA_DAVIS",
  "UNIVERSITY_OF_CAMBRIDGE",
  "UNIVERSITY_OF_NORTH_CAROLINA",
  "UNIVERSITY_OF_TEXAS_AT_AUSTIN",
  "X11_WEB",
  "XONA_COM",
]);

export const products = pgTable(
  "products",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
      name: "products_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    title: text().notNull(),
    slug: text().notNull(),
    description: text(),
    rating: numeric({ precision: 2, scale: 1 }).default("0").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    price: numeric({ precision: 10, scale: 2 }).default("0").notNull(),
    discountedPrice: numeric("discounted_price", {
      precision: 10,
      scale: 2,
    }).default("NULL"),
    percentDiscount: numeric("percent_discount", {
      precision: 5,
      scale: 2,
    }).default("NULL"),
    gender: text().default("").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productTypeId: bigint("product_type_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    categoryTypeId: bigint("category_type_id", { mode: "number" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryTypeId],
      foreignColumns: [categories.id],
      name: "products_category_type_id_fkey",
    }),
    foreignKey({
      columns: [table.productTypeId],
      foreignColumns: [productTypes.id],
      name: "products_product_type_id_fkey",
    }).onDelete("set null"),
    unique("products_slug_key").on(table.slug),
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
    check(
      "product_gender_check",
      sql`gender = ANY (ARRAY['men'::text, 'women'::text])`,
    ),
    check(
      "products_rating_range",
      sql`(rating >= (0)::numeric) AND (rating <= (5)::numeric)`,
    ),
  ],
);

export const colors = pgTable(
  "colors",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
      name: "colors_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    name: text().notNull(),
    slug: text().notNull(),
    hex: text().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("colors_slug_key").on(table.slug),
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ],
);

export const sizes = pgTable(
  "sizes",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
      name: "sizes_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    name: text().notNull(),
    slug: text().notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("sizes_slug_key").on(table.slug),
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ],
);

export const productVariants = pgTable(
  "product_variants",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
      name: "product_variants_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    sizeId: bigint("size_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    colorId: bigint("color_id", { mode: "number" }),
    sku: text(),
    barcode: text(),
    price: numeric().default("0").notNull(),
    discountedPrice: numeric("discounted_price"),
    percentDiscount: numeric("percent_discount"),
    stock: integer().default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("product_variants_color_id_idx").using(
      "btree",
      table.colorId.asc().nullsLast().op("int8_ops"),
    ),
    index("product_variants_product_id_idx").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    index("product_variants_size_id_idx").using(
      "btree",
      table.sizeId.asc().nullsLast().op("int8_ops"),
    ),
    uniqueIndex("product_variants_unique_combo").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
      table.sizeId.asc().nullsLast().op("int8_ops"),
      table.colorId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.colorId],
      foreignColumns: [colors.id],
      name: "product_variants_color_id_fkey",
    }),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "product_variants_product_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.sizeId],
      foreignColumns: [sizes.id],
      name: "product_variants_size_id_fkey",
    }),
    unique("product_variants_sku_key").on(table.sku),
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
    check("product_variants_stock_check", sql`stock >= 0`),
  ],
);

export const productTypes = pgTable(
  "product_types",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
      name: "product_types_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    name: text().notNull(),
    slug: text().notNull(),
    description: text(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("product_types_slug_key").on(table.slug),
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ],
);

export const productReviews = pgTable(
  "product_reviews",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
      name: "product_reviews_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    reviewerName: text("reviewer_name"),
    reviewerEmail: text("reviewer_email"),
    rating: integer().notNull(),
    body: text(),
    isVerifiedPurchase: boolean("is_verified_purchase")
      .default(false)
      .notNull(),
    isPublished: boolean("is_published").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    userId: uuid("user_id").notNull(),
  },
  (table) => [
    index("product_reviews_product_id_created_at_idx").using(
      "btree",
      table.productId.asc().nullsLast().op("timestamptz_ops"),
      table.createdAt.desc().nullsFirst().op("timestamptz_ops"),
    ),
    index("product_reviews_product_id_idx").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
    ),
    index("product_reviews_product_id_is_published_idx").using(
      "btree",
      table.productId.asc().nullsLast().op("int8_ops"),
      table.isPublished.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "product_reviews_product_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "product_reviews_user_id_fkey",
    }),
    pgPolicy("Enable insert for authenticated users only", {
      as: "permissive",
      for: "insert",
      to: ["authenticated"],
      withCheck: sql`true`,
    }),
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
    check("product_reviews_rating_check", sql`(rating >= 1) AND (rating <= 5)`),
  ],
);

export const cartItems = pgTable(
  "cart_items",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
      name: "cart_items_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    cartId: uuid("cart_id").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productVariantId: bigint("product_variant_id", {
      mode: "number",
    }).notNull(),
    quantity: integer().default(1).notNull(),
    priceAtTime: numeric("price_at_time").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("cart_items_cart_id_idx").using(
      "btree",
      table.cartId.asc().nullsLast().op("uuid_ops"),
    ),
    uniqueIndex("cart_items_unique_variant_per_cart").using(
      "btree",
      table.cartId.asc().nullsLast().op("int8_ops"),
      table.productVariantId.asc().nullsLast().op("int8_ops"),
    ),
    index("cart_items_variant_id_idx").using(
      "btree",
      table.productVariantId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.cartId],
      foreignColumns: [carts.id],
      name: "cart_items_cart_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.productVariantId],
      foreignColumns: [productVariants.id],
      name: "cart_items_variant_id_fkey",
    }).onDelete("cascade"),
    pgPolicy("cart_items_delete_own", {
      as: "permissive",
      for: "delete",
      to: ["public"],
      using: sql`(EXISTS ( SELECT 1
   FROM carts c
  WHERE ((c.id = cart_items.cart_id) AND (((c.user_id IS NOT NULL) AND (c.user_id = auth.uid())) OR ((c.user_id IS NULL) AND (c.session_id IS NOT NULL) AND (c.session_id = cart_session_id()))))))`,
    }),
    pgPolicy("cart_items_insert_own", {
      as: "permissive",
      for: "insert",
      to: ["public"],
    }),
    pgPolicy("cart_items_select_own", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
    pgPolicy("cart_items_update_own", {
      as: "permissive",
      for: "update",
      to: ["public"],
    }),
    check("cart_items_quantity_check", sql`quantity > 0`),
  ],
);

export const carts = pgTable(
  "carts",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id"),
    sessionId: text("session_id"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "carts_user_id_fkey",
    }).onDelete("cascade"),
    pgPolicy("carts_delete_own", {
      as: "permissive",
      for: "delete",
      to: ["public"],
      using: sql`((user_id = auth.uid()) OR ((user_id IS NULL) AND (session_id = cart_session_id())))`,
    }),
    pgPolicy("carts_insert_own", {
      as: "permissive",
      for: "insert",
      to: ["public"],
    }),
    pgPolicy("carts_select_own", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
    pgPolicy("carts_update_own", {
      as: "permissive",
      for: "update",
      to: ["public"],
    }),
  ],
);

export const productImages = pgTable(
  "product_images",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
      name: "product_images_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }).notNull(),
    url: text().notNull(),
    alt: text(),
    sortOrder: integer("sort_order").default(0).notNull(),
    isPrimary: boolean("is_primary").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("product_images_one_primary_per_product")
      .using("btree", table.productId.asc().nullsLast().op("int8_ops"))
      .where(sql`(is_primary = true)`),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "product_images_product_id_fkey",
    }).onDelete("cascade"),
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ],
);

export const testimonials = pgTable(
  "testimonials",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
      name: "testimonials_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    name: varchar({ length: 100 }).notNull(),
    rating: integer().notNull(),
    description: varchar({ length: 300 }).notNull(),
    isVerified: boolean("is_verified").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  () => [
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
    check("testimonials_rating_check", sql`(rating >= 1) AND (rating <= 5)`),
  ],
);

export const categories = pgTable(
  "categories",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({
      name: "categories_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    name: text().notNull(),
    slug: text().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("categories_slug_key").on(table.slug),
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ],
);
