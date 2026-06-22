import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/AdminNav";
import AdminProductsClient from "@/components/AdminProductsClient";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const serialized = products.map((p) => ({ ...p, price: Number(p.price) }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <AdminNav />
      <AdminProductsClient initialProducts={serialized} categories={categories} />
    </div>
  );
}
