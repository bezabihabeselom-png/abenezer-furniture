import Link from "next/link";
import Image from "next/image";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  price: number | string;
  images: string[];
  code: string;
  quantity: number;
};

export default function ProductCard({ product }: { product: ProductCardData }) {
  const img = product.images?.[0] || "/uploads/placeholder.jpg";
  const inStock = product.quantity > 0;

  return (
    <Link href={`/products/${product.slug}`} className="card overflow-hidden group block">
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <Image
          src={img}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!inStock && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.code}</p>
        <h3 className="font-medium leading-tight line-clamp-2">{product.name}</h3>
        <p className="mt-2 font-semibold text-wood-700 dark:text-wood-300">
          ETB {Number(product.price).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
