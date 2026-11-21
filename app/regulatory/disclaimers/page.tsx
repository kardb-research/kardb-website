
import type { Metadata } from "next";
import ContentPage, { InfoBlock } from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Investment Risk Disclaimers",
  description:
    "Read KARDB's investment risk disclosures, research limitations, data-source qualifications, AI limitations and investor responsibilities.",
  alternates: {
    canonical: "https://kardb.com/regulatory/disclaimers",
  },
  openGraph: {
    title: "Investment Risk Disclaimers | KARDB",
    description:
      "Understand the investment risks and limitations associated with financial research and market information published by KARDB.",
    url: "https://kardb.com/regulatory/disclaimers",
    siteName: "KARDB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Investment Risk Disclaimers | KARDB",
    description:
      "Understand the investment risks and limitations associated with financial research and market information published by KARDB.",
  },
};

export default function Page() {
  return (
    <ContentPage
      eyebrow="RISK DISCLOSURES"
      title="Investment Risk Disclaimers"
      intro="Please read these disclosures carefully before using KARDB's website, research material, financial analysis, market information or educational content."
    >
      <InfoBlock title="Important notice — KARDB's current status">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4">
          <p className="font-semibold text-amber-400">
            KARDB is not currently registered with SEBI as a Research Analyst.
          </p>
          <p className="mt-3">
            As of 21 November 2026, KARDB has not been granted SEBI Research
            Analyst registration. The platform is under development and is
            not currently offering paid research subscriptions or regulated
            Research Analyst services.
          </p>
          <p className="mt-3">
            The disclosures on this page explain general investment risks
            and the proposed framework for future research communication.
            They do not represent regulatory approval or registration.
          </p>
        </div>
      </InfoBlock>

      <InfoBlock title="1. Securities market investment risk">
        <p>
          Investment in securities markets is subject to market risks.
          Investors may lose some or all of the capital invested.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Share prices can fluctuate significantly.</li>
          <li>
            Market movements may be affected by economic, political,
            regulatory, industry and company-specific developments.
          </li>
          <li>
            Liquidity constraints, volatility, corporate events and
            unexpected market conditions may affect the ability to buy
            or sell securities.
          </li>
          <li>
            Past price behaviour does not ensure similar future behaviour.
          </li>
        </ul>
        <p className="mt-3">
          Investors should assess their financial position, investment
          objectives, time horizon and risk tolerance before making
          investment decisions.
        </p>
      </InfoBlock>

      <InfoBlock title="2. Research opinions, estimates and projections">
        <p>
          Financial analysis, valuation estimates, earnings forecasts,
          target prices, technical observations and research opinions
          involve assumptions and judgement.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Actual financial results may differ from estimates and
            projections.
          </li>
          <li>
            Valuation conclusions depend on assumptions, methodologies
            and information available at the time of analysis.
          </li>
          <li>
            Technical patterns and indicators may produce false signals.
          </li>
          <li>
            Research opinions may change as new information becomes
            available.
          </li>
        </ul>
        <p className="mt-3">
          No research opinion, estimate, projection or analytical method
          guarantees a particular investment outcome.
        </p>
      </InfoBlock>

      <InfoBlock title="3. No assured or guaranteed returns">
        <p>
          KARDB does not promise or assure any fixed return, guaranteed
          profit, minimum return or protection against investment losses.
        </p>
        <p className="mt-3">
          No representation about historical performance, analytical
          accuracy or research methodology should be interpreted as a
          guarantee of future results.
        </p>
        <p className="mt-3">
          Registration granted by SEBI and certification from NISM do not
          guarantee the performance of an intermediary or provide any
          assurance of returns to investors. This is a general regulatory
          disclosure and is not a claim that KARDB currently holds such
          registration.
        </p>
      </InfoBlock>

      <InfoBlock title="4. Information sources and data limitations">
        <p>
          Financial and market analysis may use publicly available
          information, including company annual reports, financial
          statements, stock-exchange disclosures, regulatory publications
          and other relevant data sources.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Information may contain errors, omissions or reporting delays.
          </li>
          <li>
            Historical figures may be revised or restated by the original
            source.
          </li>
          <li>
            Different sources may use different definitions, reporting
            periods or calculation methods.
          </li>
          <li>
            Market data may change after the date and time of publication.
          </li>
        </ul>
        <p className="mt-3">
          Reasonable care may be taken to review information, but no
          representation is made that every item of data is complete,
          current or error-free.
        </p>
      </InfoBlock>

      <InfoBlock title="5. Valuation and financial analysis limitations">
        <p>
          Financial ratios, DCF models, comparable-company valuations,
          cash-flow estimates and other analytical methods are tools
          for evaluating businesses. They are not precise predictions
          of future market prices.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Changes in growth, margins, interest rates and discount rates
            can materially affect valuation estimates.
          </li>
          <li>
            Peer comparisons may be affected by differences in business
            models, accounting policies and capital structures.
          </li>
          <li>
            Historical financial performance may not continue.
          </li>
          <li>
            A security trading below an estimated intrinsic value is not
            necessarily undervalued or suitable for every investor.
          </li>
        </ul>
      </InfoBlock>

      <InfoBlock title="6. Technical analysis and market indicators">
        <p>
          Technical analysis uses historical price, volume and other
          market information to identify possible trends, levels and
          trading conditions.
        </p>
        <p className="mt-3">
          Indicators, moving averages, support and resistance levels,
          momentum measures, volume analysis, breakouts, liquidity zones,
          fair value gaps and market-structure observations may be
          inconclusive or fail to predict future movements.
        </p>
        <p className="mt-3">
          Technical observations should not be treated as certainty,
          a promise of execution price or a guarantee that a market
          movement will occur.
        </p>
      </InfoBlock>

      <InfoBlock title="7. AI-assisted tools and automated analysis">
        <p>
          Technology and AI-assisted tools may support certain research
          activities, such as document processing, data organisation,
          screening, calculations and drafting assistance.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>AI outputs may contain inaccurate or fabricated information.</li>
          <li>
            Automated calculations and summaries may contain errors.
          </li>
          <li>
            Outputs may omit important context or reflect outdated data.
          </li>
          <li>
            AI-generated material should not be treated as independently
            verified research.
          </li>
        </ul>
        <p className="mt-3">
          Any future use of AI in regulated research services will be
          subject to applicable disclosure, human oversight, data
          protection and compliance requirements.
        </p>
      </InfoBlock>

      <InfoBlock title="8. Independent investment decisions">
        <p>
          Investors are responsible for their own investment decisions.
          They should independently assess the suitability of any
          investment in light of their financial circumstances,
          objectives and risk tolerance.
        </p>
        <p className="mt-3">
          Where appropriate, investors should consult a qualified
          financial professional or other relevant adviser before
          making investment decisions.
        </p>
        <p className="mt-3">
          Website information and educational material should not be
          treated as a substitute for an investor's own assessment.
        </p>
      </InfoBlock>

      <InfoBlock title="9. No execution, custody or transaction handling">
        <p>
          KARDB's website disclosures and research framework do not
          authorise KARDB to execute securities transactions, operate
          a client's trading account, hold client securities or accept
          funds for investment.
        </p>
        <p className="mt-3">
          Investors should use their own authorised broker or other
          appropriately regulated intermediary for transactions and
          related services.
        </p>
      </InfoBlock>

      <InfoBlock title="10. External websites and third-party information">
        <p>
          KARDB may refer users to external websites, public documents
          or third-party information sources for convenience and
          reference.
        </p>
        <p className="mt-3">
          External websites and their content are controlled by their
          respective operators. KARDB does not control their availability,
          accuracy, security or content.
        </p>
        <p className="mt-3">
          Users should review the terms, privacy policies and disclosures
          of third-party websites before relying on their information.
        </p>
      </InfoBlock>

      <InfoBlock title="11. Regulatory status and applicable disclosures">
        <p>
          This page is an informational risk disclosure. It is not a
          representation that KARDB is registered with SEBI, has received
          regulatory approval or is currently providing regulated
          Research Analyst services.
        </p>
        <p className="mt-3">
          Any future regulated service, research communication or
          advertisement will be subject to the disclosures and warnings
          applicable at that time.
        </p>
        <p className="mt-3">
          The prescribed standard warning for applicable Research Analyst
          advertisements is:
        </p>
        <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
          <p className="font-semibold">
            Investment in securities market are subject to market risks.
            Read all the related documents carefully before investing.
          </p>
        </div>
        <p className="mt-3">
          The wording above is reproduced for investor awareness. Its
          inclusion does not mean that this page is an advertisement
          issued by a registered Research Analyst.
        </p>
      </InfoBlock>

      <InfoBlock title="12. Important clarification and regulatory reference">
        <p>
          As of 21 November 2026, KARDB has not been granted SEBI
          Research Analyst registration. The platform is under
          development and is not currently offering paid research
          subscriptions or regulated Research Analyst services.
        </p>
        <p className="mt-3">
          These disclosures are informational and do not constitute
          legal, tax, accounting or investment advice. Applicable laws,
          regulations, circulars and directions prevail over this
          summary.
        </p>
        <p className="mt-3">
          Regulatory reference: SEBI Research Analysts Master Circular
          dated 6 February 2026, including its applicable provisions
          concerning disclosures and advertisements.
        </p>
        <a
          href="https://www.sebi.gov.in/legal/master-circulars/feb-2026/master-circular-for-research-analysts_99571.html"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-semibold text-cyan-400 underline underline-offset-4"
        >
          View SEBI Research Analysts Master Circular
        </a>
        <p className="mt-4 text-slate-400">
          Last reviewed: 21 November 2026.
        </p>
      </InfoBlock>
    </ContentPage>
  );
}
