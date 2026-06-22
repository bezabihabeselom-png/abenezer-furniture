"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCart } from "@/lib/cart-store";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  code: string;
  size?: string | null;
  quantity: number;
  images: string[];
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [showInquiry, setShowInquiry] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const inStock = product.quantity > 0;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "/uploads/placeholder.jpg",
      quantity: qty,
    });
    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* Gallery */}
      <div>
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.images?.[active] || "/uploads/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        {product.images?.length > 1 && (
          <div className="flex gap-2 mt-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative h-16 w-16 rounded overflow-hidden border-2 ${
                  i === active ? "border-wood-600" : "border-transparent"
                }`}
              >
                <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <p className="text-sm text-gray-500">{product.code}</p>
        <h1 className="font-serif text-3xl font-bold mt-1">{product.name}</h1>
        <p className="mt-3 text-2xl font-semibold text-wood-700 dark:text-wood-300">
          ETB {product.price.toLocaleString()}
        </p>

        <div className="mt-4 flex items-center gap-3 text-sm">
          <span className={inStock ? "text-green-600" : "text-red-600"}>
            {inStock ? `In Stock (${product.quantity} available)` : "Out of Stock"}
          </span>
          {product.size && <span className="text-gray-500">• Size: {product.size}</span>}
        </div>

        <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>

        {inStock && (
          <div className="mt-6 flex items-center gap-3">
            <label htmlFor="qty" className="text-sm font-medium">Qty:</label>
            <input
              id="qty"
              type="number"
              min={1}
              max={product.quantity}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Math.min(product.quantity, Number(e.target.value))))}
              className="w-20 rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
            />
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={handleAddToCart} disabled={!inStock} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
          <a
            href={`https://wa.me/251914714718?text=${encodeURIComponent(
              `Hello, I'm interested in "${product.name}" (${product.code}). Is it available?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Ask on WhatsApp
          </a>
          <button onClick={() => setShowInquiry(!showInquiry)} className="btn-secondary">
            Send Inquiry
          </button>
        </div>

        {showInquiry && <InquiryForm productId={product.id} productName={product.name} />}
      </div>
    </div>
  );
}

function InquiryForm({ productId, productName }: { productId: string; productName: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(`Hi, is "${productName}" available? Can you deliver?`);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, productId }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to send");
      toast.success("Message sent! We'll get back to you soon.");
      setName("");
      setPhone("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 card p-5 space-y-3">
      <h3 className="font-semibold">Send an inquiry about this product</h3>
      <input
        required
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
      />
      <input
        required
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
      />
      <textarea
        required
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
      />
      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
