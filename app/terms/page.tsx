import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for purchasing furniture from Abenezer Furniture.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 prose dark:prose-invert">
      <h1 className="font-serif text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="text-sm text-gray-500">Last updated: {new Date().getFullYear()}</p>

      <h2 className="font-serif text-xl font-bold mt-6">1. Orders</h2>
      <p>
        Placing an order through our website is a request to purchase. Orders are confirmed once
        Abenezer Furniture contacts you by phone to verify details and delivery arrangements.
      </p>

      <h2 className="font-serif text-xl font-bold mt-6">2. Pricing</h2>
      <p>
        All prices are listed in Ethiopian Birr (ETB) and are subject to change without prior notice.
        Custom furniture pricing will be confirmed directly with the customer before production begins.
      </p>

      <h2 className="font-serif text-xl font-bold mt-6">3. Delivery</h2>
      <p>
        Delivery timelines depend on product availability and location. We will communicate estimated
        delivery dates after order confirmation. Delivery fees may apply depending on distance.
      </p>

      <h2 className="font-serif text-xl font-bold mt-6">4. Payments</h2>
      <p>
        Payment terms (full payment or deposit) will be communicated at order confirmation. Custom
        orders typically require a deposit before production.
      </p>

      <h2 className="font-serif text-xl font-bold mt-6">5. Returns & Exchanges</h2>
      <p>
        Please inspect furniture upon delivery. Contact us within 48 hours of delivery if there is a
        manufacturing defect or damage. Custom-made furniture is not eligible for return.
      </p>

      <h2 className="font-serif text-xl font-bold mt-6">6. Contact</h2>
      <p>
        For any questions about these terms, contact Abenezer Furniture at 0914-7147-18, or visit us
        in Dessie, Ethiopia, near Furkan Masjid.
      </p>
    </div>
  );
}
