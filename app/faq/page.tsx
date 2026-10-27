import PageShell from "@/components/PageShell";

const faqs = [
  ["What is KARDB?", "KARDB is being developed as a structured research platform focused on business analysis, financial analysis, ratios, peer comparison, industry context and market behaviour."],
  ["Does KARDB guarantee investment returns?", "No. Research does not guarantee returns, and investments in securities markets involve risk."],
  ["What does a KARDB research report contain?", "Depending on the report, it can include business analysis, financial trends, ratio analysis, peer comparison, industry context and technical analysis."],
  ["Will all research reports be paid?", "Not necessarily. KARDB can provide selected free research as well as premium subscription content."],
  ["Can KARDB execute trades for me?", "Research services do not authorise a Research Analyst to execute purchase or sale transactions on behalf of a client."],
  ["How does the subscription work?", "Users can choose an available plan, create an account and, once payments are enabled, receive access according to the selected subscription."],
  ["Can I buy a single research report?", "KARDB can offer individual report access separately from subscriptions, subject to the final commercial structure."],
  ["What is SCORES?", "SCORES is SEBI's online grievance redressal platform for eligible securities-market complaints."],
  ["Does SEBI registration guarantee performance?", "No. Registration and NISM certification do not guarantee the performance of an intermediary or assure returns."],
  ["Does KARDB use AI?", "KARDB may use AI-assisted tools in parts of its workflow. Any disclosure required for regulated research services will be made according to the applicable framework."],
  ["Where can I find regulatory information?", "The complete Regulatory section is available in the footer and contains the applicable registration, investor, complaint, grievance, terms, MITC, fee, conflict, AI, audit and disclaimer sections."],
];

export default function FAQPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400">HELP CENTRE</p>
        <h1 className="mt-4 text-4xl font-black md:text-6xl">Frequently Asked Questions</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          Common questions about KARDB research, subscriptions, risk and regulatory information.
        </p>

        <div className="mt-12 space-y-4">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <summary className="cursor-pointer list-none pr-6 text-lg font-semibold text-white">
                {question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-400">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
