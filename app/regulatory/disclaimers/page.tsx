
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Investment Risk Disclaimers",
  description:
    "Read KARDB's investment risk disclaimers covering securities market risks, research limitations, past performance, information sources and investor responsibilities.",
  alternates: {
    canonical: "https://kardb.com/regulatory/disclaimers",
  },
  openGraph: {
    title: "Investment Risk Disclaimers | KARDB",
    description:
      "Read KARDB's investment risk disclaimers covering securities market risks, research limitations, past performance, information sources and investor responsibilities.",
    url: "https://kardb.com/regulatory/disclaimers",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Investment Risk Disclaimers | KARDB",
    description:
      "Read KARDB's investment risk disclaimers covering securities market risks, research limitations, past performance, information sources and investor responsibilities.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="RISK DISCLOSURES"
      title="Disclaimers"
      intro="KARDB research and website content must be read together with the applicable terms, risk disclosures and regulatory information."
    >
      <InfoBlock title="Investment risk">
        <p>Investment in securities markets is subject to market risks. Read all related documents carefully before investing.</p>
      </InfoBlock>
      <InfoBlock title="No guarantee">
        <p>Registration with SEBI and certification from NISM do not guarantee the performance of an intermediary or provide assurance of returns to investors.</p>
      </InfoBlock>
      <InfoBlock title="Research is not a guarantee">
        <p>Past performance, historical financial data, technical patterns and research conclusions do not guarantee future results. Investors should make decisions based on their own circumstances and risk considerations.</p>
      </InfoBlock>
      <InfoBlock title="Information sources">
        <p>Research may use company filings, exchange information, public disclosures and other sources considered relevant. Data can change, be corrected or become outdated.</p>
      </InfoBlock>
    </ContentPage>
  );
}
