"use client";

import { useMemo, useState } from "react";
import { CartItemProps } from "../types";
import { CartItem } from "./cart-item";
import { CartOrderContent } from "./cart-order-content";
import { EmptyCart } from "./empty-cart";

type CartClientProps = {
  initialItems: CartItemProps[];
};

export function CartClient({ initialItems }: CartClientProps) {
  const [items, setItems] = useState<CartItemProps[]>(initialItems);
  const [pendingIds, setPendingIds] = useState<number[]>([]);

  const setItemPending = (id: number, pending: boolean) => {
    setPendingIds((curr) =>
      pending ? [...new Set([...curr, id])] : curr.filter((x) => x !== id),
    );
  };

  const updateQuantity = async (id: number, nextQuantity: number) => {
    const previousItems = items;

    setItems((curr) =>
      curr.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item,
      ),
    );
    setItemPending(id, true);

    try {
      const res = await fetch(`/api/cart-items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: nextQuantity }),
      });

      if (!res.ok) {
        setItems(previousItems);
      }
    } catch {
      setItems(previousItems);
    } finally {
      setItemPending(id, false);
    }
  };

  const deleteItem = async (id: number) => {
    const previousItems = items;

    setItems((curr) => curr.filter((item) => item.id !== id));
    setItemPending(id, true);

    try {
      const res = await fetch(`/api/cart-items/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        setItems(previousItems);
      }
    } catch {
      setItems(previousItems);
    } finally {
      setItemPending(id, false);
    }
  };

  const orderContentProps = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const subtotal = Number((item.price * item.quantity).toFixed(2));
        const discount = Number(
          ((item.originalPrice - item.price) * item.quantity).toFixed(2),
        );

        acc.subtotal += subtotal;
        acc.discount += Math.max(0, discount);

        return acc;
      },
      {
        subtotal: 0,
        discount: 0,
      },
    );
  }, [items]);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4">
      <h1 className="text-3xl font-black">Cart</h1>

      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col gap-4 rounded-xl border border-gray-100 p-3.5 md:w-1/2 md:shrink-0 md:gap-6 lg:w-178.75">
          {items.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-4">
              <CartItem
                {...item}
                isPending={pendingIds.includes(item.id)}
                onDelete={() => deleteItem(item.id)}
                onDecrease={() => {
                  if (item.quantity <= 1) {
                    deleteItem(item.id);
                    return;
                  }

                  updateQuantity(item.id, item.quantity - 1);
                }}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
              />

              {index < items.length - 1 && (
                <div className="mx-4 h-px bg-gray-100"></div>
              )}
            </div>
          ))}
        </div>

        <CartOrderContent {...orderContentProps} />
      </div>
    </div>
  );
}
