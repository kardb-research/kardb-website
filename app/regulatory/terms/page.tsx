
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export default function Page() {
  return (
    <ContentPage
      eyebrow="LEGAL"
      title="Terms & Conditions"
      intro="These are the principal topics that will form the final terms governing KARDB research services. The legally operative version will be published before regulated paid services are launched."
    >
      <InfoBlock title="Service scope">
        <p>KARDB research services may include research reports, company analysis, sector research and related research outputs. The exact services available to each plan will be described on the Pricing and Research Reports pages.</p>
      </InfoBlock>
      <InfoBlock title="No execution of trades">
        <p>Research services do not authorise KARDB to execute purchase or sale transactions on behalf of a client. Clients remain responsible for their own investment and trading decisions.</p>
      </InfoBlock>
      <InfoBlock title="Research and risk">
        <p>Research is based on information and analytical methods considered relevant at the time of preparation. Market conditions and company circumstances can change. Research does not eliminate investment risk or assure a particular outcome.</p>
      </InfoBlock>
      <InfoBlock title="Access and intellectual property">
        <p>Paid reports and subscription content are intended for the subscribed user's permitted use. Copying, redistribution, resale or unauthorised publication may be restricted by the final service terms.</p>
      </InfoBlock>
      <InfoBlock title="Fees, cancellation and refunds">
        <p>The final terms will specify applicable fees, taxes, payment method, renewal, cancellation and any refund rules.</p>
      </InfoBlock>
    </ContentPage>
  );
}
