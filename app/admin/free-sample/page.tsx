import PageShell from "@/components/PageShell";
import { requireAdmin } from "@/lib/supabase/admin";
import AdminFreeSampleManager from "@/components/AdminFreeSampleManager";

export default async function AdminFreeSamplePage() {
  await requireAdmin();

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <p className="text-sm font-semibold text-cyan-400">
          KARDB ADMIN PORTAL
        </p>

        <h1 className="mt-3 text-3xl font-black text-white">
          Free Sample Management
        </h1>

        <p className="mt-2 text-slate-400">
          Upload and publish the official KARDB sample research report.
        </p>

        <div className="mt-8">
          <AdminFreeSampleManager />
        </div>
      </section>
    </PageShell>
  );
}