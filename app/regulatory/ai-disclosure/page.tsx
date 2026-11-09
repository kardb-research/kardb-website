import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "AI Usage Disclosure",
  description:
    "Understand how KARDB may use AI-assisted tools in research workflows, including data organisation, document processing, screening, drafting assistance and human oversight.",
  alternates: {
    canonical: "https://kardb.com/regulatory/ai-disclosure",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="TECHNOLOGY DISCLOSURE"
      title="AI Disclosure"
      intro="KARDB may use technology and AI-assisted tools as part of research workflows. Any AI use relevant to regulated research services will be disclosed as required by the applicable SEBI framework."
    >
      <InfoBlock title="What this means">
        <p>AI-assisted tools may support activities such as data organisation, document processing, screening or drafting assistance. Human research and compliance processes remain responsible for the final research output where required.</p>
      </InfoBlock>
      <InfoBlock title="No automatic assurance">
        <p>The use of AI does not guarantee the accuracy, completeness or performance of any research conclusion. Material information and research disclosures will be handled according to the applicable framework.</p>
      </InfoBlock>
    </ContentPage>
  );
}
