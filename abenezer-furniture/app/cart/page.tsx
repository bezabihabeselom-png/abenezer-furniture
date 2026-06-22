"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-store";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">Browse our collection and add furniture you love.</p>
        <Link href="/products" className="btn-primary">Shop Products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold mb-8">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 card p-4">
            <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">ETB {item.price.toLocaleString()}</p>
            </div>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.productId, Math.max(1, Number(e.target.value)))}
              className="w-16 rounded border border-gray-300 dark:border-gray-700 bg-transparent px-2 py-1 text-center"
            />
            <p className="w-28 text-right font-medium">
              ETB {(item.price * item.quantity).toLocaleString()}
            </p>
            <button onClick={() => removeItem(item.productId)} aria-label="Remove" className="text-red-500 hover:text-red-700">
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center border-t border-gray-200 dark:border-gray-800 pt-6">
        <p className="text-xl font-semibold">Total: ETB {total.toLocaleString()}</p>
        <Link href="/checkout" className="btn-primary">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
