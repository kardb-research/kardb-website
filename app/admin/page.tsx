import Link from "next/link";
import PageShell from "@/components/PageShell";
import { requireAdmin } from "@/lib/supabase/admin";

export default async function AdminDashboardPage() {
  const { user, profile } = await requireAdmin();

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/50 p-8">
          <p className="text-sm font-semibold text-cyan-400">
            KARDB ADMIN PORTAL
          </p>

          <h1 className="mt-3 text-3xl font-black text-white">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Welcome, {user.email}
          </p>

          <p className="mt-2 text-sm text-cyan-400">
            Role: {profile.role}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AdminCard
              title="Research Reports"
              description="Upload, manage and publish company research reports."
              href="/admin/reports"
            />

            <AdminCard
              title="Subscribers"
              description="View and manage subscriber accounts and subscriptions."
              href="/admin/subscribers"
            />

            <AdminCard
              title="Market Brief"
              description="Manage daily and weekly market brief content."
              href="/admin/market-brief"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function AdminCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-slate-700 bg-slate-950/50 p-5 transition hover:border-cyan-400"
    >
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      <p className="mt-4 text-sm font-semibold text-cyan-400">
        Open Module →
      </p>
    </Link>
  );
}