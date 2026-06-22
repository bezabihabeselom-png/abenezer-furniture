"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
      <div className="flex gap-2 flex-wrap">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              pathname === l.href
                ? "bg-wood-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="text-sm font-medium text-red-600 hover:underline"
      >
        Sign Out
      </button>
    </div>
  );
}
