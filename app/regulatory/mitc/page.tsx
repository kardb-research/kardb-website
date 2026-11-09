
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Most Important Terms & Conditions (MITC)",
  description:
    "Review KARDB's Most Important Terms and Conditions covering research services, applicable fees, advance payments, refunds, payment methods and investment risk disclosures.",
  alternates: {
    canonical: "https://kardb.com/regulatory/mitc",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="MITC"
      title="Most Important Terms & Conditions"
      intro="The MITC section is based on the current SEBI framework for Research Analysts and will be incorporated into the operative client terms before regulated onboarding."
    >
      <InfoBlock title="Research service only">
        <p>A Research Analyst provides research services and cannot execute purchase or sale transactions on behalf of a client.</p>
      </InfoBlock>
      <InfoBlock title="Fees">
        <p>For individual and HUF clients, the applicable fee is subject to the maximum prescribed by SEBI/RAASB. The current stated limit is 1,51,000 per annum per family for all research services, excluding statutory charges. The applicable limit should be rechecked when the service is launched.</p>
      </InfoBlock>
      <InfoBlock title="Advance fees">
        <p>Advance fees may be accepted only within the period and conditions permitted by the applicable SEBI framework. The current MITC states that the advance period should not exceed one quarter.</p>
      </InfoBlock>
      <InfoBlock title="Payments and refunds">
        <p>Permitted electronic/payment modes may be used; cash payment is not permitted under the current MITC. Where services are terminated early, the applicable proportionate refund rules apply to the unexpired period.</p>
      </InfoBlock>
      <InfoBlock title="No guaranteed returns">
        <p>Assured, guaranteed or fixed-return schemes of the prohibited nature cannot be offered as Research Analyst services.</p>
      </InfoBlock>
    </ContentPage>
  );
}
