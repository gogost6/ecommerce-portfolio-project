export type CartItemProps = {
  id: number;
  title: string;
  size: string;
  color: string;
  price: number;
  originalPrice: number;
  quantity: number;
  src: string;
  alt: string;
};

export type CartOrderContentProps = {
  subtotal: number;
  discount: number;
  deliveryFee?: number;
};
