import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Abenezer Furniture, a home and office furniture manufacturer based in Dessie, Ethiopia, near Furkan Masjid.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold mb-6">About Abenezer Furniture</h1>

      <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
        <Image src="/uploads/workshop.jpg" alt="Abenezer Furniture workshop" fill className="object-cover" />
      </div>

      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        <p>
          Abenezer Furniture is a home and office furniture manufacturer and retailer based in Dessie,
          Ethiopia, located near Furkan Masjid. We design and build furniture that combines durability,
          comfort, and modern style — from bedroom and living room sets to complete office furnishings.
        </p>
        <p>
          Every piece that leaves our workshop is built with carefully selected materials and finished by
          experienced craftsmen. We work directly with customers to create custom furniture tailored to
          their space, taste, and budget.
        </p>
        <h2 className="font-serif text-2xl font-bold pt-4">Our Mission</h2>
        <p>
          To provide quality, affordable furniture to homes and businesses across Ethiopia, while supporting
          local craftsmanship and delivering excellent customer service.
        </p>
        <h2 className="font-serif text-2xl font-bold pt-4">Visit Our Showroom</h2>
        <p>
          We welcome you to visit our showroom in Dessie, near Furkan Masjid, to see our furniture in
          person. Can't make it in? Call us at <a href="tel:0914714718" className="text-wood-600">0914-7147-18</a> or
          message us on <a href="https://wa.me/251914714718" className="text-wood-600">WhatsApp</a>.
        </p>
      </div>
    </div>
  );
}
