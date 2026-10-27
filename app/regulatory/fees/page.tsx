
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export default function Page() {
  return (
    <ContentPage
      eyebrow="FEES"
      title="Fee Structure"
      intro="KARDB's public product pricing and the regulatory fee framework should be read together. Final fees will be published before paid regulated services launch."
    >
      <InfoBlock title="Planned product pricing">
        <div className="grid gap-4 md:grid-cols-3">
          <div><strong>Free</strong><p className="text-slate-400">Selected research and educational content.</p></div>
          <div><strong>Research</strong><p className="text-slate-400">Deeper research access.</p></div>
          <div><strong>Pro</strong><p className="text-slate-400">Expanded research and premium content.</p></div>
        </div>
      </InfoBlock>
      <InfoBlock title="Regulatory fee ceiling">
        <p>The current SEBI/RAASB MITC states a maximum of 1,51,000 per annum per family for all research services for individual/HUF clients, excluding statutory charges. The limit does not apply in the same manner to non-individual/accredited-investor clients. Applicable rules should be checked at launch.</p>
      </InfoBlock>
      <InfoBlock title="Taxes and payment">
        <p>Any applicable statutory taxes/charges will be shown separately where required. Payment methods and refund/cancellation terms will be disclosed before purchase.</p>
      </InfoBlock>
    </ContentPage>
  );
}
