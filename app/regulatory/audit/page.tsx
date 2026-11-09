
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Compliance Audit Disclosure",
  description:
    "View KARDB's compliance audit disclosure, including current operational status and the framework for future audit reporting under applicable SEBI requirements.",
  alternates: {
    canonical: "https://kardb.com/regulatory/audit",
  },
  openGraph: {
    title: "Compliance Audit Disclosure | KARDB",
    description:
      "View KARDB's compliance audit disclosure, including current operational status and the framework for future audit reporting under applicable SEBI requirements.",
    url: "https://kardb.com/regulatory/audit",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Compliance Audit Disclosure | KARDB",
    description:
      "View KARDB's compliance audit disclosure, including current operational status and the framework for future audit reporting under applicable SEBI requirements.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="COMPLIANCE"
      title="Compliance Audit"
      intro="Registered Research Analysts are subject to applicable annual compliance-audit requirements. The public status section will be updated once KARDB's regulated operation is active."
    >
      <InfoBlock title="Current status">
        <p>Not operational / not yet populated. No audit status is being represented before the applicable regulated operation and audit cycle exist.</p>
      </InfoBlock>
      <InfoBlock title="Future disclosure">
        <p>The website will disclose the applicable compliance-audit status and any material adverse findings or action taken, in accordance with the current SEBI/RAASB requirements.</p>
      </InfoBlock>
    </ContentPage>
  );
}
