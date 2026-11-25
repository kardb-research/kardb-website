import PageShell from "@/components/PageShell";
import AdminFeedbackManager from "@/components/AdminFeedbackManager";
import { requireAdmin } from "@/lib/supabase/admin";

export default async function AdminFeedbackPage() {
  await requireAdmin();

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-cyan-400">KARDB ADMIN PORTAL</p>
          <h1 className="mt-3 text-3xl font-black text-white">Feedback Management</h1>
          <p className="mt-2 text-slate-400">
            Review user feedback, track feature requests and update their progress.
          </p>
        </div>
        <AdminFeedbackManager />
      </section>
    </PageShell>
  );
}
