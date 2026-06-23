import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminNav from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <AdminNav />
      <h1 className="font-serif text-2xl font-bold mb-4">
        Welcome back, {session?.user?.name || "Admin"}
      </h1>
      <p className="text-gray-500 mb-8">Your admin dashboard is ready.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-xl font-bold mt-1 text-green-600">Website Live ✅</p>
        </div>
      </div>
    </div>
  );
}
