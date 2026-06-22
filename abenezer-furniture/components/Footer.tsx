import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-wood-900 text-wood-50 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-serif text-lg font-bold mb-3">Abenezer Furniture</h3>
          <p className="text-sm text-wood-100/80">
            Quality home and office furniture manufacturing and sales in Dessie, Ethiopia.
            Custom designs built with craftsmanship and care.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-wood-100/80">
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/cart">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm text-wood-100/80">
            <li><Link href="/products?category=beds">Beds</Link></li>
            <li><Link href="/products?category=sofas">Sofas</Link></li>
            <li><Link href="/products?category=dining-tables">Dining Tables</Link></li>
            <li><Link href="/products?category=office-furniture">Office Furniture</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-sm text-wood-100/80">
            <li>📍 Dessie, Ethiopia — near Furkan Masjid</li>
            <li>📞 <a href="tel:0914714718">0914-7147-18</a></li>
            <li>
              <a href="https://wa.me/251914714718" target="_blank" rel="noopener noreferrer">
                💬 Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-wood-800 py-6 text-center text-xs text-wood-200/70">
        <p>© {new Date().getFullYear()} Abenezer Furniture. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/admin/login">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
