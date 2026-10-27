
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export default function Page() {
  return (
    <ContentPage
      eyebrow="REGULATORY DISCLOSURE"
      title="SEBI Registration"
      intro="Registration-specific information will be published here once KARDB's applicable regulatory status and registered particulars are confirmed."
    >
      <InfoBlock title="Registration details">
        <div className="grid gap-4 md:grid-cols-2">
          <p><strong>Registered Name:</strong> To be updated</p>
          <p><strong>SEBI Registration Number:</strong> To be updated</p>
          <p><strong>Registration Category:</strong> Research Analyst, if applicable</p>
          <p><strong>Registered Address:</strong> To be updated</p>
          <p><strong>Telephone:</strong> To be updated</p>
          <p><strong>Email:</strong> To be updated</p>
          <p><strong>Compliance Officer:</strong> To be updated, where applicable</p>
          <p><strong>Grievance Contact:</strong> To be updated, where applicable</p>
        </div>
      </InfoBlock>
      <InfoBlock title="Important">
        <p>Registration information must never be inferred or invented. The final registered name, registration number, address and responsible officers will be inserted from the official registration records before regulated services are represented as registered services.</p>
      </InfoBlock>
    </ContentPage>
  );
}
