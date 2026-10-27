import Link from "next/link";
import PageShell from "@/components/PageShell";

export default function LoginPage() {
  return <PageShell><AuthCard title="Welcome back" subtitle="Sign in to access your KARDB account." button="Login" footer={<>New to KARDB? <Link className="text-cyan-400" href="/account/register">Create an account</Link></>} /></PageShell>;
}

function AuthCard({ title, subtitle, button, footer }: { title: string; subtitle: string; button: string; footer: React.ReactNode }) {
  return <section className="mx-auto max-w-md px-6 py-20">
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
      <h1 className="text-3xl font-black">{title}</h1>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      <form className="mt-8 space-y-5">
        <label className="block text-sm text-slate-300">Email<input type="email" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400" placeholder="you@example.com" /></label>
        <label className="block text-sm text-slate-300">Password<input type="password" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400" placeholder="••••••••" /></label>
        <button type="button" className="w-full rounded-lg bg-cyan-400 px-4 py-3 font-bold text-slate-950">{button}</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">{footer}</p>
    </div>
  </section>;
}
