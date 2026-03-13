import { relations } from "drizzle-orm/relations";
import { authUsers } from "drizzle-orm/supabase";
import {
  cartItems,
  carts,
  categories,
  colors,
  productImages,
  productReviews,
  products,
  productTypes,
  productVariants,
  sizes,
} from "./schema";

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryTypeId],
    references: [categories.id],
  }),
  productType: one(productTypes, {
    fields: [products.productTypeId],
    references: [productTypes.id],
  }),
  productVariants: many(productVariants),
  productReviews: many(productReviews),
  productImages: many(productImages),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productTypesRelations = relations(productTypes, ({ many }) => ({
  products: many(products),
}));

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    color: one(colors, {
      fields: [productVariants.colorId],
      references: [colors.id],
    }),
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    size: one(sizes, {
      fields: [productVariants.sizeId],
      references: [sizes.id],
    }),
    cartItems: many(cartItems),
  }),
);

export const colorsRelations = relations(colors, ({ many }) => ({
  productVariants: many(productVariants),
}));

export const sizesRelations = relations(sizes, ({ many }) => ({
  productVariants: many(productVariants),
}));

export const productReviewsRelations = relations(productReviews, ({ one }) => ({
  product: one(products, {
    fields: [productReviews.productId],
    references: [products.id],
  }),
  usersInAuth: one(authUsers, {
    fields: [productReviews.userId],
    references: [authUsers.id],
  }),
}));

export const usersInAuthRelations = relations(authUsers, ({ many }) => ({
  productReviews: many(productReviews),
  carts: many(carts),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  productVariant: one(productVariants, {
    fields: [cartItems.productVariantId],
    references: [productVariants.id],
  }),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  cartItems: many(cartItems),
  usersInAuth: one(authUsers, {
    fields: [carts.userId],
    references: [authUsers.id],
  }),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));
