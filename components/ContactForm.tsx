"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to send");
      toast.success("Message sent! We'll respond shortly.");
      setForm({ name: "", phone: "", message: "" });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="card p-6 space-y-4">
      <h2 className="font-semibold text-lg">Send Us a Message</h2>
      <input
        required
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
      />
      <input
        required
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
      />
      <textarea
        required
        rows={5}
        placeholder='e.g. "How much is the king bed?" or "Can you deliver to Kombolcha?"'
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
      />
      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
