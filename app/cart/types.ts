export type CartItemProps = {
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  src: string;
  alt: string;
};

export type CartOrderContentProps = {
  subtotal: number;
  discount: number;
  deliveryFee?: number;
};
