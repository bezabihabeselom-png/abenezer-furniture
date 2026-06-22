import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Abenezer Furniture website and online ordering system.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 prose dark:prose-invert">
      <h1 className="font-serif text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500">Last updated: {new Date().getFullYear()}</p>

      <h2 className="font-serif text-xl font-bold mt-6">1. Information We Collect</h2>
      <p>
        When you place an order or contact us, we collect your name, phone number, delivery address,
        and any notes you provide. This information is used solely to process your order or respond
        to your inquiry.
      </p>

      <h2 className="font-serif text-xl font-bold mt-6">2. How We Use Your Information</h2>
      <p>
        We use your information to fulfill orders, communicate with you about your order or inquiry,
        and improve our products and services. We do not sell or rent your personal information to
        third parties.
      </p>

      <h2 className="font-serif text-xl font-bold mt-6">3. Data Storage</h2>
      <p>
        Order and inquiry data is stored securely in our database and is only accessible to authorized
        Abenezer Furniture staff.
      </p>

      <h2 className="font-serif text-xl font-bold mt-6">4. Cookies</h2>
      <p>
        Our website uses local browser storage to remember items in your shopping cart. We do not use
        tracking cookies for advertising purposes.
      </p>

      <h2 className="font-serif text-xl font-bold mt-6">5. Your Rights</h2>
      <p>
        You may contact us at any time to request that your information be corrected or deleted by
        calling 0914-7147-18 or messaging us on WhatsApp.
      </p>

      <h2 className="font-serif text-xl font-bold mt-6">6. Contact</h2>
      <p>Abenezer Furniture, Dessie, Ethiopia — near Furkan Masjid. Phone: 0914-7147-18</p>
    </div>
  );
}
