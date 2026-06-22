import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/AdminNav";
import AdminOrdersClient from "@/components/AdminOrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const [orders, inquiries] = await Promise.all([
    prisma.order.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const serializedOrders = orders.map((o) => ({
    id: o.id,
    customerName: o.customerName,
    phone: o.phone,
    address: o.address,
    deliveryNotes: o.deliveryNotes,
    notes: o.notes,
    status: o.status,
    total: Number(o.total),
    createdAt: o.createdAt.toISOString(),
    items: o.items.map((i) => ({
      id: i.id,
      quantity: i.quantity,
      price: Number(i.price),
      product: { name: i.product.name },
    })),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <AdminNav />
      <AdminOrdersClient initialOrders={serializedOrders} initialInquiries={inquiries} />
    </div>
  );
}
