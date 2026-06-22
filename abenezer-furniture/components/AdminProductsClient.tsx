"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

type Category = { id: string; name: string };
type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  size?: string | null;
  quantity: number;
  images: string[];
  featured: boolean;
  active: boolean;
  categoryId: string;
  category: Category;
};

const empty = {
  code: "", name: "", description: "", price: 0, size: "", quantity: 0,
  images: [] as string[], featured: false, active: true, categoryId: "",
};

export default function AdminProductsClient({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState<typeof empty>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      code: p.code, name: p.name, description: p.description, price: p.price,
      size: p.size || "", quantity: p.quantity, images: p.images,
      featured: p.featured, active: p.active, categoryId: p.categoryId,
    });
    setShowForm(true);
  }

  function startNew() {
    setEditingId(null);
    setForm({ ...empty, categoryId: categories[0]?.id || "" });
    setShowForm(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm((f) => ({ ...f, images: [...f.images, data.url] }));
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(url: string) {
    setForm((f) => ({ ...f, images: f.images.filter((i) => i !== url) }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), quantity: Number(form.quantity) };
      const res = await fetch(editingId ? `/api/products/${editingId}` : "/api/products", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      if (editingId) {
        setProducts((ps) => ps.map((p) => (p.id === editingId ? { ...p, ...data, price: Number(data.price) } : p)));
      } else {
        const category = categories.find((c) => c.id === form.categoryId)!;
        setProducts((ps) => [{ ...data, price: Number(data.price), category }, ...ps]);
      }
      toast.success("Product saved");
      setShowForm(false);
      setForm(empty);
      setEditingId(null);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProducts((ps) => ps.filter((p) => p.id !== id));
      toast.success("Product deleted");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold">Manage Products</h1>
        <button onClick={startNew} className="btn-primary">+ Add Product</button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="card p-6 mb-8 space-y-4">
          <h2 className="font-semibold">{editingId ? "Edit Product" : "New Product"}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Product Code" value={form.code} onChange={(v) => setForm({ ...form, code: v })} required />
            <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Price (ETB)" type="number" value={String(form.price)} onChange={(v) => setForm({ ...form, price: Number(v) })} required />
            <Field label="Quantity" type="number" value={String(form.quantity)} onChange={(v) => setForm({ ...form, quantity: Number(v) })} required />
            <Field label="Size / Details" value={form.size} onChange={(v) => setForm({ ...form, size: v })} />
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
                required
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Images</label>
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageUpload} disabled={uploading} />
            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
            <div className="flex gap-2 mt-2 flex-wrap">
              {form.images.map((img) => (
                <div key={img} className="relative h-20 w-20 rounded overflow-hidden border border-gray-300 dark:border-gray-700">
                  <Image src={img} alt="product" fill className="object-cover" />
                  <button type="button" onClick={() => removeImage(img)} className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1">✕</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured on homepage
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              Active (visible to customers)
            </label>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
              {saving ? "Saving..." : "Save Product"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-200 dark:border-gray-800">
              <th className="py-2 pr-4">Image</th>
              <th className="py-2 pr-4">Code</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Qty</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 dark:border-gray-900">
                <td className="py-2 pr-4">
                  <div className="relative h-12 w-12 rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image src={p.images[0] || "/uploads/placeholder.jpg"} alt={p.name} fill className="object-cover" />
                  </div>
                </td>
                <td className="py-2 pr-4">{p.code}</td>
                <td className="py-2 pr-4">{p.name}</td>
                <td className="py-2 pr-4">{p.category?.name}</td>
                <td className="py-2 pr-4">ETB {p.price.toLocaleString()}</td>
                <td className="py-2 pr-4">{p.quantity}</td>
                <td className="py-2 pr-4">{p.active ? "Active" : "Hidden"}</td>
                <td className="py-2 pr-4 space-x-3">
                  <button onClick={() => startEdit(p)} className="text-wood-600 hover:underline">Edit</button>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="text-gray-500 py-6">No products yet. Add your first one above.</p>}
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, required, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
      />
    </div>
  );
}
