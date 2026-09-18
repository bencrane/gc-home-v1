# Product

Government Contracted (GC): a media property covering federal procurement. Bloomberg Media for govcon. One vehicle of Bazaar Global, the firm. Confirmed by the operator on 2026-09-17.

## Platform
web

## Stack
Astro 7 static site with React 19 islands, TypeScript 6, Tailwind 4, shadcn/ui on Base UI with the gc-hq packages/ui component set, ECharts, GSAP, Remotion, hyperframes. Design authority: DESIGN.md, executed by src/index.css. Data: core-x query sidecar and Lance system of record.

## Users
- CEOs and principals of companies that have just won a federal award. GC reaches them directly; the site is what makes the outreach credible.
- Capital and equipment partners (lenders, equipment finance, workforce) evaluating the desk behind an introduction. Bazaar Global reaches them; GC is the reference they check.
- Readers of federal procurement coverage: markets and briefings.

## Product Purpose
Establish GC as a primary-source publication on federal contracting so that a cold approach to an award winner lands as an invitation from a known name, and the CEO consents to being connected with a specialized partner.

## Positioning
Authority through the public record. Every federal contract dollar is public; GC reads it continuously and publishes what it means. Editorial, factual, document-like. Not a desk, not a terminal, not a SaaS product.

## Operating Context
Read on desktop and phone, often from a link in an outreach email. First impression must carry within one viewport. Long-form reads and reference tables follow.

## Capabilities and Constraints
- Sections: Markets (obligations by agency, sector, geography, time), Briefings (editorial), award and recipient reference views.
- Data comes from the core-x sidecar and Lance; this repo holds no pipelines.
- The gc-hq-new opening animation is not recreated.
- The identity (paper, navy, copper, Fraunces, Inter, JetBrains Mono, navy rail) is carried over verbatim.

## Brand Commitments
Government Contracted name and seal mark. Navy and copper only. Fraunces at weight 400. Sharp corners. The navy rail on the left of every page.

## Evidence on Hand
Screens of gc-hq-new: the opening record (obligated FY25, companies awarded, contract actions), the obligations-by-agency ledger, and the paper hero with the award vignette. No user research, testimonials, or benchmarks; do not invent any.

## Product Principles
1. The record is the product. 2. Typography carries authority. 3. Structure over decoration. 4. Numbers are tabular and right-aligned, always.

## Accessibility & Inclusion
WCAG AA contrast on paper and on ink. Keyboard navigation for every control. `prefers-reduced-motion` disables entry and data-change motion.
