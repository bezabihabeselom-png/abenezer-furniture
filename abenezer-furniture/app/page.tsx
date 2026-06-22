import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

const categories = [
  { name: "Beds", slug: "beds", img: "/uploads/cat-beds.jpg" },
  { name: "Sofas", slug: "sofas", img: "/uploads/cat-sofas.jpg" },
  { name: "Dining Tables", slug: "dining-tables", img: "/uploads/cat-dining.jpg" },
  { name: "Chairs", slug: "chairs", img: "/uploads/cat-chairs.jpg" },
  { name: "Wardrobes", slug: "wardrobes", img: "/uploads/cat-wardrobes.jpg" },
  { name: "Doors", slug: "doors", img: "/uploads/cat-doors.jpg" },
  { name: "Office Furniture", slug: "office-furniture", img: "/uploads/cat-office.jpg" },
  { name: "Custom Furniture", slug: "custom-furniture", img: "/uploads/cat-custom.jpg" },
];

const reviews = [
  { name: "Mekdes A.", text: "Excellent craftsmanship. Our dining table looks amazing and was delivered on time." },
  { name: "Yonas T.", text: "Ordered an office desk and chairs for our new branch. Great quality and fair prices." },
  { name: "Selamawit B.", text: "The bedroom set exceeded our expectations. Highly recommend Abenezer Furniture." },
];

export default async function HomePage() {
  let featured: any[] = [];
  try {
    featured = await prisma.product.findMany({
      where: { active: true, featured: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    featured = [];
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-wood-900 text-white">
        <div className="absolute inset-0 opacity-30">
          <Image src="/uploads/hero-furniture.jpg" alt="Abenezer Furniture showroom" fill priority className="object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 sm:py-36 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Furniture Crafted for <span className="text-wood-300">Your Life</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-wood-100 text-lg">
            Premium home and office furniture, manufactured and sold in Dessie, Ethiopia.
            Quality craftsmanship, durable materials, designs built to order.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn-primary">Shop Products</Link>
            <a href="https://wa.me/251914714718" target="_blank" rel="noopener noreferrer" className="btn-secondary border-white text-white hover:bg-white/10">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image src="/uploads/workshop.jpg" alt="Abenezer Furniture workshop" fill className="object-cover" />
        </div>
        <div>
          <h2 className="font-serif text-3xl font-bold mb-4">About Abenezer Furniture</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Located near Furkan Masjid in Dessie, Ethiopia, Abenezer Furniture has built a reputation for
            quality home and office furniture manufacturing. From solid wood bedframes to executive office
            sets, every piece is crafted with care, durable materials, and attention to detail. We also build
            custom furniture to match your exact space and style.
          </p>
          <Link href="/about" className="inline-block mt-5 font-medium text-wood-600 hover:underline">
            Learn more about us →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map((c) => (
              <Link key={c.slug} href={`/products?category=${c.slug}`} className="card overflow-hidden group">
                <div className="relative aspect-square bg-gray-200 dark:bg-gray-800">
                  <Image src={c.img} alt={c.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <p className="p-3 text-center font-medium">{c.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-3xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-wood-600 font-medium hover:underline">View all →</Link>
        </div>
        {featured.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={{ ...p, price: Number(p.price) }} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Products coming soon. Please check back, or contact us directly.</p>
        )}
      </section>

      {/* Reviews */}
      <section className="bg-wood-50 dark:bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="card p-6">
                <div className="text-wood-500 mb-2">★★★★★</div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{r.text}"</p>
                <p className="mt-4 font-medium">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-serif text-3xl font-bold mb-4">Ready to Furnish Your Space?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Visit our showroom near Furkan Masjid in Dessie, call us, or order online — we deliver.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/products" className="btn-primary">Browse Products</Link>
          <Link href="/contact" className="btn-secondary">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
