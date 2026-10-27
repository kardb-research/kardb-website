
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export default function Page() {
  return (
    <ContentPage
      eyebrow="TRANSPARENCY"
      title="Conflict of Interest"
      intro="KARDB will disclose material conflicts that could reasonably be relevant to an investor's assessment of research."
    >
      <InfoBlock title="Research-report disclosures">
        <p>Where applicable, research reports will address financial interest in the subject company, relevant beneficial ownership, other material conflicts and other disclosures required by the applicable Research Analyst regulations.</p>
      </InfoBlock>
      <InfoBlock title="Policy">
        <ul className="list-disc space-y-2 pl-5">
          <li>Material conflicts will be identified and managed through the applicable compliance process.</li>
          <li>Required disclosures will accompany relevant research outputs.</li>
          <li>Commercial relationships will not be represented as evidence of investment performance.</li>
        </ul>
      </InfoBlock>
    </ContentPage>
  );
}
