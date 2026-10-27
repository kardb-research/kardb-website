
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export default function Page() {
  return (
    <ContentPage
      eyebrow="GRIEVANCE REDRESSAL"
      title="Grievance Redressal"
      intro="KARDB will publish the operational grievance contacts and applicable escalation routes before regulated research services commence."
    >
      <InfoBlock title="Step 1 — Contact KARDB">
        <p>Clients should first use the designated grievance contact published by KARDB. The complaint should include sufficient details and supporting documents to allow the issue to be reviewed.</p>
      </InfoBlock>
      <InfoBlock title="Step 2 — SCORES 2.0">
        <p>Investors can use SEBI's SCORES platform for eligible securities-market complaints. The current platform is <a className="text-cyan-400" href="https://scores.sebi.gov.in" target="_blank">scores.sebi.gov.in</a>.</p>
      </InfoBlock>
      <InfoBlock title="Further review / ODR">
        <p>The applicable SEBI framework also provides escalation/review mechanisms and, where applicable, access to online dispute resolution. The current process and links will be kept aligned with SEBI's latest requirements.</p>
      </InfoBlock>
    </ContentPage>
  );
}
