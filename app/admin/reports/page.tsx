import PageShell from "@/components/PageShell";
import AdminBatchManager from "@/components/AdminBatchManager";
import { requireAdmin } from "@/lib/supabase/admin";

export default async function AdminReportsPage() {
  await requireAdmin();

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-cyan-400">
            KARDB ADMIN PORTAL
          </p>

          <h1 className="mt-3 text-3xl font-black text-white">
            Research Reports Management
          </h1>

          <p className="mt-2 text-slate-400">
            Create and manage monthly research report batches.
          </p>
        </div>

        <AdminBatchManager />
      </section>
    </PageShell>
  );
}