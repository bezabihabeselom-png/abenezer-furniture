import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Abenezer Furniture in Dessie, Ethiopia near Furkan Masjid. Call 0914-7147-18 or message us on WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-10">
        We'd love to hear from you. Reach out by phone, WhatsApp, or the form below.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <InfoRow icon="📍" title="Location" text="Dessie, Ethiopia — near Furkan Masjid" />
          <InfoRow icon="📞" title="Phone" text="0914-7147-18" link="tel:0914714718" />
          <InfoRow icon="💬" title="WhatsApp" text="Chat with us instantly" link="https://wa.me/251914714718" />
          <InfoRow icon="🕒" title="Hours" text="Monday – Saturday, 8:00 AM – 7:00 PM" />

          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 h-64">
            <iframe
              title="Abenezer Furniture location map"
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps?q=Furkan+Masjid+Dessie+Ethiopia&output=embed"
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}

function InfoRow({ icon, title, text, link }: { icon: string; title: string; text: string; link?: string }) {
  const content = link ? (
    <a href={link} target={link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-wood-600 hover:underline">
      {text}
    </a>
  ) : (
    <span>{text}</span>
  );
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-gray-600 dark:text-gray-300">{content}</p>
      </div>
    </div>
  );
}
