# Government Contracted — editorial formats

Each format is a recurring piece with one question, one sidecar read, one presentation.
Query ids below are the `dataBlock.queryId` values. Every query is ONE statement against
the core-x query sidecar (`POST /api/v1/sql`), frozen at publish with the artifact stamp.

Status 2026-09-17: all seven queries VALIDATED against artifact `query_sidecar_20260802T120425Z`
(sidecar resumed). Every format returns a publishable figure in one statement, 0.03 s to 4.4 s.
Snapshot is dated 2026-08-02; a sidecar rebuild refreshes it.

| # | Format | Section | Cadence | Presentation | queryId |
|---|---|---|---|---|---|
| 1 | The Record | Markets | Quarterly / FY close | ledger + figures | `record.agency_fy` |
| 2 | Expiring | Markets | Monthly | ledger | `expiring.sector_180d` |
| 3 | Flows | Markets | Monthly | chart | `flows.agency_naics_delta` |
| 4 | Sub-Under | Markets | Monthly | ledger | `subunder.prime_lane` |
| 5 | Win-then-Borrow | Briefings | Quarterly | figures + ledger | `wtb.lender_class_after_award` |
| 6 | Wage Floor | Briefings | Quarterly | ledger | `wage.floor_vs_market_county` |
| 7 | Who Won | Briefings | Monthly | ledger | `whowon.largest_new_awards` |

Gists:
1. **The Record** — "Every federal contract dollar is public." Obligations by awarding agency for a fiscal period, ranked, with prior-period delta.
2. **Expiring** — "What ends in the next 180 days." Active awards by sector reaching period-of-performance end, incumbents named.
3. **Flows** — "Where the money moved." Net change in obligations by agency × NAICS3 across two windows.
4. **Sub-Under** — "The demand beneath the primes." Sub-award volume under the largest primes by work lane.
5. **Win-then-Borrow** — "The award is the collateral." UCC financing filed within 180 days after a first award, by lender class.
6. **Wage Floor** — "The rate the contract sets, and the rate the county pays." SCA floor vs OEWS market wage by county for a work lane.
7. **Who Won** — "The month's largest new awards." The gorillas: the biggest base awards of the month, who took them, from which agency. Readers sub under these primes; nobody wants to read about a peer.

## Editorial line (binding)

GC is read by market participants. Every piece is about the market a reader operates in: agency
demand, recompetes, flows, sub-award demand, financing patterns, wage floors, who won. A company
is an actor in the market, never the subject dissected. Analysis of one award's recipient and what
performing it requires in capital, equipment, or workforce is desk work and belongs to Bazaar
Global's partner-facing material, not to GC. Award Vignette was removed on this rule (2026-09-17).
A large award may be reported as news (what, to whom, which agency, market context) with no needs
analysis.

## Reader rules (2026-09-17)
- Readers are companies in the market. They read about agencies, flows, recompetes, wages, financing patterns, and the big primes. They do not read about peer-sized competitors' wins in public.
- A private, logged-in view (own award history, targetable recompetes) is parked; not built now.
