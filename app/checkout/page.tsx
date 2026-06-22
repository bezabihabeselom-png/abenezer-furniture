"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCart } from "@/lib/cart-store";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    deliveryNotes: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");

      clear();
      toast.success("Order placed successfully! We'll contact you shortly.");
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>

      <div className="card p-5 mb-6">
        <h2 className="font-semibold mb-3">Order Summary</h2>
        {items.map((i) => (
          <div key={i.productId} className="flex justify-between text-sm py-1">
            <span>{i.name} × {i.quantity}</span>
            <span>ETB {(i.price * i.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-800 mt-3 pt-3">
          <span>Total</span>
          <span>ETB {total.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <Field label="Full Name" required value={form.customerName} onChange={(v) => setForm({ ...form, customerName: v })} />
        <Field label="Phone Number" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Field label="Delivery Address" required value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
        <Field label="Delivery Notes (optional)" value={form.deliveryNotes} onChange={(v) => setForm({ ...form, deliveryNotes: v })} />
        <Field label="Order Notes (optional)" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} textarea />

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {textarea ? (
        <textarea
          required={required}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
        />
      ) : (
        <input
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
        />
      )}
    </div>
  );
}
