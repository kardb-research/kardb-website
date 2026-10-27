
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export default function Page() {
  return (
    <ContentPage
      eyebrow="REGULATORY DISCLOSURE"
      title="SEBI Registration Status"
      intro="KARDB's SEBI Research Analyst registration has not yet been confirmed as granted. Registration details will be published here only after official confirmation."
    >
      <InfoBlock title="Current status">
        <p>
          KARDB is currently developing its financial research and
          educational platform. SEBI Research Analyst registration details
          will be updated if and when registration is granted.
        </p>
        <p className="mt-4">
          No SEBI registration number is being claimed on this page.
          Visitors should not interpret this website as confirmation that
          KARDB is a SEBI-registered Research Analyst.
        </p>
      </InfoBlock>

      <InfoBlock title="Registration details">
        <div className="grid gap-4 md:grid-cols-2">
          <p><strong>Registered Name:</strong> Not confirmed</p>
          <p><strong>SEBI Registration Number:</strong> Not granted / not confirmed</p>
          <p><strong>Registration Category:</strong> Research Analyst registration not confirmed</p>
          <p><strong>Registered Address:</strong> To be updated, where applicable</p>
          <p><strong>Telephone:</strong> To be updated</p>
          <p><strong>Email:</strong> To be updated</p>
          <p><strong>Compliance Officer:</strong> To be updated, where applicable</p>
          <p><strong>Grievance Contact:</strong> To be updated, where applicable</p>
        </div>
      </InfoBlock>

      <InfoBlock title="Services and disclosures">
        <p>
          Paid research plans are not currently available through the
          Pricing page. The website is under development, and any future
          services will be offered only after the applicable regulatory
          requirements have been addressed.
        </p>
        <p className="mt-4">
          Registration information will be updated using official records.
          No registration number, approval, or regulatory status will be
          inferred or represented without confirmation.
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
