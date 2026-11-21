
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "SEBI Research Analyst Registration Status",
  description:
    "KARDB's current SEBI Research Analyst registration status and related regulatory disclosures.",
  alternates: {
    canonical: "https://kardb.com/regulatory/sebi-registration",
  },
  openGraph: {
    title: "SEBI Registration Status | KARDB",
    description:
      "Read KARDB's current Research Analyst registration status and related disclosures.",
    url: "https://kardb.com/regulatory/sebi-registration",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SEBI Registration Status | KARDB",
    description:
      "KARDB's current SEBI Research Analyst registration status.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="REGULATORY DISCLOSURE"
      title="SEBI Registration Status"
      intro="KARDB has not been granted SEBI registration as a Research Analyst as of 21 November 2026. The platform is under development."
    >
      <InfoBlock title="Current registration status">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
          <p className="text-xs font-bold tracking-[0.18em] text-amber-400">
            CURRENT STATUS
          </p>

          <h2 className="mt-2 text-xl font-bold text-white">
            Not registered as a SEBI Research Analyst
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            As of 21 November 2026, KARDB has not been granted
            registration by the Securities and Exchange Board of
            India (SEBI) as a Research Analyst.
          </p>
        </div>

        <p className="mt-5">
          KARDB is developing its equity research platform and
          proposed research framework. The website's availability,
          research methodology descriptions or sample material
          must not be interpreted as evidence of SEBI registration.
        </p>

        <p className="mt-4">
          KARDB is not currently offering paid research subscriptions
          or regulated Research Analyst services.
        </p>
      </InfoBlock>

      <InfoBlock title="Registration information">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-400">
              Registration status
            </p>
            <p className="mt-1 font-semibold text-white">
              Not granted as of 21 November 2026
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              SEBI registration number
            </p>
            <p className="mt-1 font-semibold text-white">
              Not applicable — registration not granted
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Registration category
            </p>
            <p className="mt-1 font-semibold text-white">
              Research Analyst registration not granted
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Registration certificate
            </p>
            <p className="mt-1 font-semibold text-white">
              Not issued to KARDB as of the stated date
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Registered legal entity name
            </p>
            <p className="mt-1 font-semibold text-white">
              No SEBI-registered entity is being represented
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Registered office address
            </p>
            <p className="mt-1 font-semibold text-white">
              No SEBI-registered office is being represented
            </p>
          </div>
        </div>
      </InfoBlock>

      <InfoBlock title="Compliance and contact information">
        <p>
          KARDB is not presenting any person as its SEBI-registered
          Research Analyst compliance officer or registered-entity
          grievance officer on this page.
        </p>

        <p className="mt-4">
          No regulatory contact details, registration particulars
          or official capacities should be inferred from the KARDB
          brand name or from the existence of this website.
        </p>

        <p className="mt-4">
          Any applicable entity details, designated contacts and
          regulatory disclosures will be published only after the
          relevant information and regulatory position have been
          formally verified.
        </p>
      </InfoBlock>

      <InfoBlock title="Services currently available">
        <p>
          KARDB is not currently offering paid research subscriptions
          or regulated Research Analyst services. No paid research
          subscription or payment is being accepted through the
          Pricing page.
        </p>

        <p className="mt-4">
          Any sample research material made available on the website
          is illustrative and should not be treated as a live research
          subscription or as evidence of registration.
        </p>

        <p className="mt-4">
          Future services, if introduced, will be considered only
          after the applicable regulatory requirements and operational
          conditions have been addressed.
        </p>
      </InfoBlock>

      <InfoBlock title="Future updates to this page">
        <p>
          If SEBI registration is granted in the future, this page
          will be reviewed and updated using the details appearing
          in the official registration records and certificate,
          as applicable.
        </p>

        <p className="mt-4">
          Any future update may include the registered legal name,
          registration number, registration category, registered
          address and applicable contact and compliance details.
          No such future particulars are being claimed at present.
        </p>
      </InfoBlock>

      <InfoBlock title="Important clarification">
        <p>
          This page states KARDB's registration position as of
          21 November 2026. It is a status disclosure and does not
          constitute a SEBI registration certificate, regulatory
          approval, legal opinion or confirmation of compliance
          with every requirement applicable to a registered
          Research Analyst.
        </p>

        <p className="mt-4">
          Visitors should independently verify the registration
          status of any intermediary through official SEBI records
          before relying on a claim of registration.
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
