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
    ...o,
    total: Number(o.total),
    createdAt: o.createdAt.toISOString(), items: o.items.map((i) => ({ ...i, price: Number(i.price) })),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <AdminNav />
      <AdminOrdersClient initialOrders={serializedOrders} initialInquiries={inquiries} />
    </div>
  );
}
