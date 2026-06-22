import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-7xl mb-4">🪑</p>
      <h1 className="font-serif text-4xl font-bold mb-3">404 — Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Sorry, we couldn't find the page you're looking for. It may have been moved or no longer exists.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/" className="btn-primary">Back to Home</Link>
        <Link href="/products" className="btn-secondary">Browse Products</Link>
      </div>
    </div>
  );
}
