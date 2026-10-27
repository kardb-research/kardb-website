
import ContentPage, { InfoBlock } from "@/components/ContentPage";

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
