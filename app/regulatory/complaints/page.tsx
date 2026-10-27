
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export default function Page() {
  return (
    <ContentPage
      eyebrow="INVESTOR PROTECTION"
      title="Investor Complaints"
      intro="Applicable complaint statistics will be disclosed in the prescribed format and updated at the required frequency once regulated research services are operational."
    >
      <InfoBlock title="Complaint disclosure">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="border-b border-slate-700 text-slate-400">
              <tr><th className="py-3">Month</th><th className="py-3">Received</th><th className="py-3">Resolved</th><th className="py-3">Pending</th></tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-800"><td className="py-3">Not operational</td><td>—</td><td>—</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </InfoBlock>
      <InfoBlock title="Update frequency">
        <p>For a registered Research Analyst, complaint data is to be disclosed on the website/mobile application in the applicable prescribed format and within the prescribed timeline. KARDB will use the current SEBI/RAASB format applicable at the time of operation.</p>
      </InfoBlock>
    </ContentPage>
  );
}
