import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  const [productCount, orderCount, pendingOrders, unreadInquiries, totalRevenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.inquiry.count({ where: { read: false } }),
    prisma.order.aggregate({ _sum: { total: true } }),
  ]);

  const stats = [
    { label: "Total Products", value: productCount },
    { label: "Total Orders", value: orderCount },
    { label: "Pending Orders", value: pendingOrders },
    { label: "Unread Messages", value: unreadInquiries },
    { label: "Total Revenue (ETB)", value: Number(totalRevenue._sum.total || 0).toLocaleString() },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <AdminNav />
      <h1 className="font-serif text-2xl font-bold mb-1">
        Welcome back, {session?.user?.name || "Admin"}
      </h1>
      <p className="text-gray-500 mb-8">Here's an overview of your store.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold mt-1">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
