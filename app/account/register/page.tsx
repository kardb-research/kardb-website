import Link from "next/link";
import PageShell from "@/components/PageShell";

export default function RegisterPage() {
  return <PageShell><section className="mx-auto max-w-md px-6 py-20">
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
      <h1 className="text-3xl font-black">Create your account</h1>
      <p className="mt-2 text-sm text-slate-400">Start exploring KARDB research.</p>
      <form className="mt-8 space-y-5">
        <label className="block text-sm text-slate-300">Name<input className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Your name" /></label>
        <label className="block text-sm text-slate-300">Email<input type="email" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" placeholder="you@example.com" /></label>
        <label className="block text-sm text-slate-300">Password<input type="password" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Create a password" /></label>
        <button type="button" className="w-full rounded-lg bg-cyan-400 px-4 py-3 font-bold text-slate-950">Create Account</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link className="text-cyan-400" href="/account/login">Login</Link></p>
    </div>
  </section></PageShell>;
}
