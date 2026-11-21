
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Research Fee Structure | KARDB",
  description:
    "KARDB's research fee disclosure covering the SEBI fee ceiling, applicability, advance payments, refunds and permitted payment methods.",
  alternates: {
    canonical: "https://kardb.com/regulatory/fees",
  },
  openGraph: {
    title: "Research Fee Structure | KARDB",
    description:
      "Understand the regulatory fee framework applicable to SEBI-registered Research Analysts and KARDB's current status.",
    url: "https://kardb.com/regulatory/fees",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Research Fee Structure | KARDB",
    description:
      "KARDB's research fee disclosure and current regulatory status.",
  },
};

const linkClass =
  "font-semibold text-cyan-400 underline underline-offset-4";

export default function Page() {
  return (
    <ContentPage
      eyebrow="FEE DISCLOSURE"
      title="Research Fee Structure"
      intro="This page explains the regulatory fee framework applicable to SEBI-registered Research Analysts. KARDB's future product pricing, if introduced, will be published separately after the applicable regulatory and operational requirements have been addressed."
    >
      <InfoBlock title="Important notice — KARDB's current status">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5">
          <p className="font-semibold text-amber-400">
            KARDB is not currently registered with SEBI as a Research Analyst.
          </p>
          <p className="mt-3">
            As of 21 November 2026, KARDB has not been granted
            SEBI Research Analyst registration. The platform is
            under development and is not currently offering paid
            research subscriptions or regulated Research Analyst
            services.
          </p>
          <p className="mt-3">
            No research subscription fee or payment for regulated
            Research Analyst services is currently being accepted
            through KARDB.
          </p>
          <p className="mt-3">
            The information below describes the applicable
            regulatory framework. It is not a current KARDB
            price list or an offer to provide paid research
            services.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="1. Regulatory fee ceiling">
        <p>
          Under Regulation 15A of the SEBI (Research Analysts)
          Regulations and paragraph 1.9 of the SEBI Research
          Analysts Master Circular dated 6 February 2026,
          Research Analysts may charge fees subject to the
          applicable ceiling and must ensure that fees are
          fair and reasonable.
        </p>

        <div className="mt-4 rounded-xl border border-slate-700 p-5">
          <p className="font-semibold text-cyan-400">
            Prescribed annual fee ceiling
          </p>
          <p className="mt-2 text-3xl font-bold">
            ₹1,51,000
          </p>
          <p className="mt-2">
            Per annum per family, for all research services
            of the Research Analyst, where the applicable
            individual/HUF client fee provisions apply.
          </p>
          <p className="mt-3 text-sm text-slate-400">
            Applicable statutory charges are excluded from
            this ceiling.
          </p>
        </div>

        <p className="mt-4">
          The fee ceiling is subject to revision and
          announcement by RAASB once in three years,
          based on the Cost Inflation Index and after
          due consultation with SEBI.
        </p>
      </InfoBlock>

      <InfoBlock title="2. Applicability of fee-related provisions">
        <p>
          The fee-related provisions concerning the fee
          ceiling, payment modes, refunds, advance fees
          and breakage fees apply to individual and HUF
          clients who are not accredited investors.
        </p>

        <p className="mt-3">
          These specific fee-related provisions do not
          apply in the same manner to:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Non-individual clients.</li>
          <li>Accredited investors.</li>
          <li>
            Institutional investors seeking recommendations
            of a proxy adviser.
          </li>
        </ul>

        <p className="mt-4">
          For non-individual clients, accredited investors
          and the specified institutional proxy-adviser
          clients, fee-related terms are governed through
          bilaterally negotiated contractual terms.
        </p>
      </InfoBlock>

      <InfoBlock title="3. Advance fee payments">
        <p>
          Under paragraph 1.9(f) of the SEBI Research
          Analysts Master Circular dated 6 February 2026,
          a Research Analyst may collect fees in advance
          if the client agrees.
        </p>

        <div className="mt-4 rounded-xl border border-slate-700 p-4">
          <p className="font-semibold text-cyan-400">
            Maximum advance period
          </p>
          <p className="mt-2 text-2xl font-bold">
            Up to one year
          </p>
          <p className="mt-2">
            Advance fees must not exceed the fees for
            a period of one year, subject to the client's
            agreement and applicable requirements.
          </p>
        </div>

        <p className="mt-4">
          This advance-fee provision must be read together
          with the applicable client agreement and the
          prescribed MITC.
        </p>

        <p className="mt-3">
          KARDB is not currently collecting advance fees
          or any research subscription payments.
        </p>
      </InfoBlock>

      <InfoBlock title="4. Premature termination and refunds">
        <p>
          Where Research Analyst services are terminated
          prematurely in accordance with the agreed
          terms and conditions, the client is entitled
          to a proportionate refund of fees for the
          unexpired service period.
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            The refund is calculated for the eligible
            unexpired period.
          </li>
          <li>
            A Research Analyst shall not charge a
            breakage fee under the applicable provision.
          </li>
          <li>
            The applicable cancellation and refund
            process should be disclosed in the client
            agreement.
          </li>
        </ul>

        <p className="mt-4">
          These provisions describe the regulatory
          framework. KARDB is not currently accepting
          paid research subscriptions.
        </p>
      </InfoBlock>

      <InfoBlock title="5. Permitted payment methods">
        <p>
          The prescribed MITC identifies payment modes
          such as:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Cheque.</li>
          <li>Online bank transfer.</li>
          <li>UPI.</li>
          <li>Other permitted electronic payment modes.</li>
        </ul>

        <div className="mt-4 rounded-xl border border-slate-700 p-4">
          <p className="font-semibold text-amber-400">
            Cash payments are not permitted
          </p>
          <p className="mt-2">
            Cash payment is not an allowed payment mode
            under the prescribed Research Analyst MITC.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="6. Centralised Fee Collection Mechanism (CeFCoM)">
        <p>
          The prescribed MITC requires Research Analysts
          to provide clients with guidance on the optional
          Centralised Fee Collection Mechanism for
          Investment Advisers and Research Analysts
          (CeFCoM).
        </p>

        <p className="mt-3">
          The mechanism is managed by BSE Limited,
          the recognised RAASB referred to in the
          applicable framework.
        </p>

        <p className="mt-4">
          <a
            href="https://www.bseindia.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Visit BSE India
          </a>
        </p>
      </InfoBlock>

      <InfoBlock title="7. Statutory charges and taxes">
        <p>
          The prescribed annual fee ceiling does not
          include statutory charges.
        </p>

        <p className="mt-3">
          Any applicable statutory charges and taxes
          must be disclosed appropriately in the
          relevant fee terms and client documentation.
        </p>

        <p className="mt-3">
          KARDB has not published or activated a paid
          subscription price list. No current tax or
          payment amount is being quoted on this page.
        </p>
      </InfoBlock>

      <InfoBlock title="8. KARDB product pricing">
        <p>
          KARDB's future product plans and subscription
          prices, if introduced, will be disclosed
          separately on the Pricing page.
        </p>

        <p className="mt-3">
          Any future pricing will be determined after
          considering the applicable regulatory fee
          provisions, service scope, client category,
          statutory charges and operational requirements.
        </p>

        <p className="mt-4">
          <a href="/pricing" className={linkClass}>
            View KARDB Pricing Information
          </a>
        </p>
      </InfoBlock>

      <InfoBlock title="9. Related disclosures">
        <p>
          For further information about the prescribed
          client terms and payment conditions, refer
          to the MITC page.
        </p>

        <p className="mt-3">
          <a href="/regulatory/mitc" className={linkClass}>
            View Most Important Terms & Conditions (MITC)
          </a>
        </p>

        <p className="mt-3">
          <a href="/regulatory/sebi-registration" className={linkClass}>
            View KARDB's SEBI Registration Status
          </a>
        </p>
      </InfoBlock>

      <InfoBlock title="10. Official regulatory reference">
        <p>
          The fee framework presented on this page is
          based on paragraph 1.9 of the SEBI Research
          Analysts Master Circular dated 6 February 2026
          and the related SEBI directions.
        </p>

        <p className="mt-4">
          <a
            href="https://www.sebi.gov.in/sebi_data/attachdocs/feb-2026/1770375507051.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            View SEBI Research Analysts Master Circular — 6 February 2026
          </a>
        </p>

        <p className="mt-4 text-sm text-slate-400">
          This page is an informational regulatory
          disclosure, not a current KARDB price list,
          payment request, client agreement or
          representation of SEBI registration.
          Applicable laws, regulations, circulars
          and directions prevail.
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
