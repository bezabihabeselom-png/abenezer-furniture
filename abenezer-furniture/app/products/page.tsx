import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";

export const metadata: Metadata = {
  title: "Furniture Products",
  description:
    "Browse our full catalog of beds, sofas, dining tables, chairs, wardrobes, doors, office and custom furniture, handmade by Abenezer Furniture in Dessie, Ethiopia.",
};

export const revalidate = 60;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        active: true,
        ...(searchParams.category ? { category: { slug: searchParams.category } } : {}),
        ...(searchParams.q
          ? { name: { contains: searchParams.q, mode: "insensitive" } }
          : {}),
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold mb-2">Our Furniture Collection</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Quality home and office furniture, manufactured in Dessie, Ethiopia.
      </p>

      <ProductFilters categories={categories} activeCategory={searchParams.category} />

      {products.length === 0 ? (
        <p className="text-gray-500 mt-10">No products found in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={{ ...p, price: Number(p.price) }} />
          ))}
        </div>
      )}
    </div>
  );
}
