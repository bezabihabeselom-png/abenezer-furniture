"use client";

import Link from "next/link";

type Category = { name: string; slug: string };

export default function ProductFilters({
  categories,
  activeCategory,
}: {
  categories: Category[];
  activeCategory?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/products"
        className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
          !activeCategory
            ? "bg-wood-600 text-white border-wood-600"
            : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/products?category=${c.slug}`}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
            activeCategory === c.slug
              ? "bg-wood-600 text-white border-wood-600"
              : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
