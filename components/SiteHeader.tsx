import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Research", "/research"],
  ["Reports", "/reports"],
  ["Methodology", "/methodology"],
  ["Pricing", "/pricing"],
  ["About", "/about"],
  ["FAQ", "/faq"],
  ["Regulatory", "/regulatory"],
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-4">
        <Link href="/" className="shrink-0 text-xl font-black tracking-tight text-white">
          KARDB<span className="text-cyan-400">.</span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap text-sm text-slate-300 transition hover:text-cyan-400"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/account/login"
            className="hidden text-sm text-slate-300 transition hover:text-white sm:block"
          >
            Login
          </Link>
          <Link
            href="/account/register"
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto border-t border-slate-800/60 lg:hidden">
        <nav className="mx-auto flex min-w-max items-center gap-5 px-6 py-3">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-slate-300 hover:text-cyan-400"
            >
              {label}
            </Link>
          ))}
          <Link href="/account/subscription" className="text-sm text-slate-300 hover:text-cyan-400">
            Subscription
          </Link>
        </nav>
      </div>
    </header>
  );
}
