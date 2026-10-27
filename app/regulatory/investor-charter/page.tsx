
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export default function Page() {
  return (
    <ContentPage
      eyebrow="INVESTOR PROTECTION"
      title="Investor Charter"
      intro="This section summarises the investor-facing framework applicable to Research Analysts. The final charter used for regulated services will follow the latest SEBI-prescribed version."
    >
      <InfoBlock title="Purpose">
        <p>The charter is intended to help investors understand the nature of research services, investor rights, service expectations, responsibilities, and grievance mechanisms.</p>
      </InfoBlock>
      <InfoBlock title="Research services">
        <ul className="list-disc space-y-2 pl-5">
          <li>Research reports and analysis based on publicly available information and research work.</li>
          <li>Disclosure of relevant financial interests and material conflicts.</li>
          <li>Transparent terms and conditions before onboarding for paid research services.</li>
          <li>Appropriate record keeping and compliance processes.</li>
        </ul>
      </InfoBlock>
      <InfoBlock title="Investor rights">
        <ul className="list-disc space-y-2 pl-5">
          <li>Fair and transparent treatment.</li>
          <li>Adequate information about the service and applicable charges.</li>
          <li>Disclosure of material conflicts and relevant statutory information.</li>
          <li>Access to the applicable grievance redressal mechanism.</li>
        </ul>
      </InfoBlock>
      <InfoBlock title="Investor responsibilities">
        <ul className="list-disc space-y-2 pl-5">
          <li>Read research reports, terms and risk disclosures carefully.</li>
          <li>Provide accurate information where required for onboarding.</li>
          <li>Do not share account credentials or misuse paid research content.</li>
          <li>Do not treat research as a guarantee of returns.</li>
        </ul>
      </InfoBlock>
    </ContentPage>
  );
}
