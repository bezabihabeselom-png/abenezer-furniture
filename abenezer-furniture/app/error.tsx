"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-7xl mb-4">⚠️</p>
      <h1 className="font-serif text-4xl font-bold mb-3">Something Went Wrong</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        We're sorry, an unexpected error occurred. Please try again, or contact us at 0914-7147-18 if
        the problem continues.
      </p>
      <button onClick={() => reset()} className="btn-primary">Try Again</button>
    </div>
  );
}
