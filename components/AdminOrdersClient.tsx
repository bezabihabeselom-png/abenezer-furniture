"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type OrderItem = { id: string; quantity: number; price: number; product: { name: string } };
type Order = {
  id: string; customerName: string; phone: string; address: string;
  deliveryNotes?: string | null; notes?: string | null; status: string;
  total: number; items: OrderItem[]; createdAt: string | Date;
};
type Inquiry = {
  id: string; name: string; phone: string; message: string; read: boolean; createdAt: string | Date;
};

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function AdminOrdersClient({
  initialOrders,
  initialInquiries,
}: {
  initialOrders: Order[];
  initialInquiries: Inquiry[];
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [tab, setTab] = useState<"orders" | "inquiries">("orders");

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setOrders((os) => os.map((o) => (o.id === id ? { ...o, status } : o)));
      toast.success("Order status updated");
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function markRead(id: string) {
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to update");
      setInquiries((is) => is.map((i) => (i.id === id ? { ...i, read: true } : i)));
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("orders")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "orders" ? "bg-wood-600 text-white" : "border border-gray-300 dark:border-gray-700"}`}
        >
          Orders ({orders.length})
        </button>
        <button
          onClick={() => setTab("inquiries")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "inquiries" ? "bg-wood-600 text-white" : "border border-gray-300 dark:border-gray-700"}`}
        >
          Customer Messages ({inquiries.filter((i) => !i.read).length} unread)
        </button>
      </div>

      {tab === "orders" ? (
        <div className="space-y-4">
          {orders.length === 0 && <p className="text-gray-500">No orders yet.</p>}
          {orders.map((o) => (
            <div key={o.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{o.customerName}</p>
                  <p className="text-sm text-gray-500">{o.phone} · {o.address}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">ETB {o.total.toLocaleString()}</p>
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className={`mt-1 text-xs rounded px-2 py-1 border-0 ${statusColors[o.status]}`}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 border-t border-gray-100 dark:border-gray-800 pt-3 text-sm space-y-1">
                {o.items.map((i) => (
                  <p key={i.id}>{i.product.name} × {i.quantity} — ETB {(i.price * i.quantity).toLocaleString()}</p>
                ))}
              </div>
              {(o.deliveryNotes || o.notes) && (
                <div className="mt-3 text-sm text-gray-500">
                  {o.deliveryNotes && <p>Delivery notes: {o.deliveryNotes}</p>}
                  {o.notes && <p>Order notes: {o.notes}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.length === 0 && <p className="text-gray-500">No messages yet.</p>}
          {inquiries.map((i) => (
            <div key={i.id} className={`card p-5 ${!i.read ? "border-wood-400" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{i.name} {!i.read && <span className="ml-2 text-xs bg-wood-600 text-white px-2 py-0.5 rounded-full">New</span>}</p>
                  <p className="text-sm text-gray-500">{i.phone}</p>
                  <p className="mt-2">{i.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(i.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <a href={`tel:${i.phone}`} className="text-wood-600 text-sm hover:underline">Call</a>
                  {!i.read && (
                    <button onClick={() => markRead(i.id)} className="text-sm text-gray-500 hover:underline">
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
