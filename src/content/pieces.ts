import type { Piece, Frozen } from "./types"
import record from "@/fixtures/record_fy25.json"
import flows from "@/fixtures/flows_fy25.json"
import expiring from "@/fixtures/expiring_561.json"
import subunder from "@/fixtures/subunder_236.json"
import whowon from "@/fixtures/whowon_2026_05.json"
import wage from "@/fixtures/wage_tx_guard2.json"

const F = (x: unknown) => x as Frozen
const NAICS3: Record<string, string> = { "336": "Transportation equipment", "541": "Professional services", "236": "Building construction", "621": "Ambulatory health care", "524": "Insurance", "324": "Petroleum products", "325": "Chemicals & pharma", "523": "Securities & funds", "562": "Remediation", "561": "Facilities support", "237": "Heavy civil", "423": "Wholesale durables", "334": "Electronics" }
/** Flows chart wants one label per agency × industry row. */
const flowsLabeled: Frozen = { ...F(flows), rows: F(flows).rows.map((r) => ({ ...r, label: `${String(r.agency).replace("Department of ", "").replace("Agency for International Development", "USAID").replace("Health and Human Services", "HHS").replace("Homeland Security", "DHS").replace("Veterans Affairs", "VA").replace("General Services Administration", "GSA").replace("Housing and Urban Development", "HUD")} · ${NAICS3[String(r.naics3)] ?? r.naics3}` })) }
const SRC = "USAspending FPDS via core-x query sidecar, snapshot 2026-08-02"

export const PIECES: Piece[] = [
  {
    slug: "defense-up-10-hhs-down-a-quarter-fy25",
    title: "Defense Spending Rose 10% in FY25 as HHS Fell by a Quarter",
    dek: "The Pentagon added $45.8 billion to its contract book while Health and Human Services gave back $10 billion. Nine of the fifteen largest buyers shrank.",
    section: "markets", format: "record", formatName: "The Record",
    publishedAt: "2026-09-17", byline: "GC Staff",
    body: [
      { kind: "figures", source: SRC, figures: [
        { label: "Obligated · FY25", value: "$719.1B", sub: "all agencies" },
        { label: "Defense share", value: "68.4%", sub: "$491.8B" },
        { label: "Agencies that shrank", value: "9 of 15", sub: "largest buyers" },
      ]},
      { kind: "p", text: "Federal contract obligations in fiscal 2025 concentrated further in the Department of Defense. The department obligated $491.8 billion, up $45.8 billion or 10.3% on the prior year, across 47,511 recipients. No other agency added more than $12 billion." },
      { kind: "p", text: "Veterans Affairs was the second-largest buyer at $78.3 billion, growing 17%. Homeland Security grew fastest among the large agencies at 20%, reaching $28.4 billion. Energy and NASA grew in the mid single digits." },
      { kind: "ledger", heading: "Obligations by awarding agency · FY25", data: F(record), label: "agency", value: "obl", valueFormat: "money", delta: "pct", source: SRC },
      { kind: "p", text: "The contraction was broad below the top four. Health and Human Services fell 27% to $26.8 billion. State, Agriculture, Interior, and Commerce each lost between 17% and 20%. The Agency for International Development lost nearly half its book, from $7.5 billion to $4.2 billion." },
      { kind: "p", text: "For contractors the picture is two markets. Defense, VA, and DHS are expanding demand. Civilian agencies outside those three are recompeting smaller books, and incumbents there face pressure on renewal." },
    ],
  },
  {
    slug: "defense-shifted-43-billion-into-aircraft-and-vehicles",
    title: "Defense Shifted $43 Billion Into Aircraft and Vehicles in One Year",
    dek: "Transportation equipment absorbed nearly all of the Pentagon's growth. Construction and petroleum lost ground, and HHS professional services fell $6 billion.",
    section: "markets", format: "flows", formatName: "Flows",
    publishedAt: "2026-09-16", byline: "GC Staff",
    body: [
      { kind: "p", text: "The largest single movement in the FY25 record is Defense obligations in NAICS 336, transportation equipment manufacturing, which rose from $129.1 billion to $171.9 billion. That $42.8 billion increase is almost the entire year-over-year growth of the department." },
      { kind: "chart", heading: "Largest obligation movements by agency and industry · FY24 to FY25", data: flowsLabeled, category: "label", series: [{ column: "delta", name: "Change" }], valueFormat: "money", source: SRC },
      { kind: "p", text: "Two civilian movements stand out against it. Health and Human Services professional services (NAICS 541) fell $6.2 billion, and Homeland Security construction (NAICS 236) went from $430 million to $5.9 billion, a thirteen-fold increase driven by border infrastructure awards." },
      { kind: "p", text: "Within Defense, construction fell $3.8 billion and petroleum products fell $3.5 billion while professional services grew $3.7 billion and remediation grew $2.6 billion. Veterans Affairs grew in ambulatory care, insurance, and pharmaceuticals." },
      { kind: "p", text: "Read together, demand moved toward hardware and border construction and away from civilian services. A services contractor whose book leans on HHS, USAID, or GSA saw the market shrink underneath it in FY25." },
    ],
  },
  {
    slug: "savannah-river-39-billion-runs-out-in-september",
    title: "$39 Billion of Savannah River Work Runs Out in September",
    dek: "The largest facilities-support contract in the federal record ends on the last day of the fiscal year. Behind it, $5.4 billion of Texas base operations expires in December.",
    section: "markets", format: "expiring", formatName: "Expiring",
    publishedAt: "2026-09-15", byline: "GC Staff",
    body: [
      { kind: "p", text: "Savannah River Nuclear Solutions' management and operations contract with the Department of Energy, valued at $38.8 billion with $27.1 billion obligated, reaches its current end date on September 30. It is the largest award in facilities support (NAICS 561) ending within 180 days, and by a wide margin the largest in the sector." },
      { kind: "ledger", heading: "Facilities support awards ending within 180 days · by current value", data: F(expiring), label: "recipient", sub: "agency", value: "current_value", valueFormat: "money", source: SRC },
      { kind: "p", text: "Two more September expirations follow: Leidos' $3.2 billion National Science Foundation award and Maximus' $2.8 billion HHS contact-center contract. Vectrus and PAE hold Defense and State base-operations work of $850 million and $780 million ending the same day." },
      { kind: "p", text: "The December cluster is Texas. Nelson Refrigeration, Jones Lang LaSalle, and J&J Maintenance hold Defense facilities-maintenance awards worth $5.4 billion combined, all ending December 31, with less than 10% of ceiling obligated. These are vehicles with headroom, and the question is whether they are re-awarded or replaced." },
      { kind: "p", text: "Amentum's spaceport operations contract for NASA is the nearest expiration on the list, ending July 31 with $608 million obligated of $667 million." },
    ],
  },
  {
    slug: "rq-construction-largest-buyer-of-subcontracted-federal-work",
    title: "RQ Construction Is the Largest Buyer of Subcontracted Federal Work",
    dek: "Fifteen builders placed $1.6 billion of sub-awards on federal construction over two years. Three of them account for half of it.",
    section: "markets", format: "subunder", formatName: "Sub-Under",
    publishedAt: "2026-09-14", byline: "GC Staff",
    body: [
      { kind: "p", text: "In federal building construction (NAICS 236), the primes that buy the most subcontracted capacity are not the largest primes. RQ Construction of Carlsbad, California placed $320 million across 339 sub-awards to 235 distinct subcontractors since August 2024, the most of any federal builder." },
      { kind: "ledger", heading: "Sub-award volume under construction primes · trailing 24 months", data: F(subunder), label: "prime", value: "sub_amount", valueFormat: "money", source: "USAspending FSRS via core-x query sidecar, snapshot 2026-08-02" },
      { kind: "p", text: "BL Harbert International placed $275 million across 408 sub-awards and Harper Construction $241 million across 176. Together the top three account for $836 million, half the total for the fifteen largest buyers." },
      { kind: "p", text: "Bechtel National, the largest of these firms by revenue, placed $53 million across 73 subs. Parsons placed $51 million across seven. The volume of subcontracting a prime reports is a function of its project mix and its reporting discipline, not its size." },
      { kind: "p", text: "For a subcontractor, the list is the demand side of the market: the primes with active federal building programs and a demonstrated habit of buying capacity. RQ's 235 distinct subs in two years is a wider door than Parsons' seven." },
    ],
  },
  {
    slug: "southwest-valley-constructors-takes-1-7-billion-border-award",
    title: "Southwest Valley Constructors Takes $1.7 Billion Border Award",
    dek: "Homeland Security construction produced four of May's five largest new awards, $3.1 billion combined, all in Texas and California.",
    section: "briefings", format: "whowon", formatName: "Who Won",
    publishedAt: "2026-09-12", byline: "GC Staff",
    body: [
      { kind: "p", text: "The largest new federal contract award in May 2026 was a $1.72 billion task order to Southwest Valley Constructors from the Department of Homeland Security for construction in Texas. Fisher Sand & Gravel took the second and fourth largest, $605 million and $345 million, both in California, and Sundt Construction took $443 million." },
      { kind: "ledger", heading: "Largest new awards · May 2026", data: F(whowon), label: "recipient", sub: "agency", value: "obligation", valueFormat: "money", source: SRC },
      { kind: "p", text: "All four are border infrastructure awards under DHS vehicles, and together they explain most of the department's thirteen-fold increase in construction obligations for the year. Tutor Perini added three Alaska task orders under the same agency worth $225 million combined." },
      { kind: "p", text: "Outside construction, the Sabin Vaccine Institute took a $224 million HHS research award, Textron Aviation a $208 million FAA aircraft order, and LMI Consulting a $172 million DHS professional-services task." },
      { kind: "p", text: "The month belonged to heavy civil. For anyone in earthwork, concrete, steel, or haul in Texas, Arizona, and California, the primes above are where the sub-award volume will appear over the next eighteen months." },
    ],
  },
  {
    slug: "border-counties-set-guard-wages-2-50-under-the-texas-market",
    title: "Border Counties Set Guard Wages $2.50 Under the Texas Market",
    dek: "The Service Contract Act floor for a Guard II runs from $14.73 in Webb County to $16.10 in East Texas. The state's market median is $17.30.",
    section: "briefings", format: "wage", formatName: "Wage Floor",
    publishedAt: "2026-09-10", byline: "GC Staff",
    body: [
      { kind: "p", text: "A security contractor bidding federal guard work in Texas prices labor against two numbers: the wage determination floor the contract sets, and the wage the county's market actually pays. In twelve counties the gap is more than a dollar an hour, and along the border it exceeds two." },
      { kind: "ledger", heading: "Guard II · SCA floor vs Texas market median, by county", data: F(wage), label: "county_name", value: "floor_hourly", valueFormat: "hourly", source: "SAM.gov wage determinations and BLS OEWS via core-x query sidecar" },
      { kind: "p", text: "Webb County's floor is $14.73 against a statewide market median of $17.30 for security guards (SOC 33-9032). El Paso and Hudspeth sit at $14.84. Cameron and Hidalgo are $15.09 and $15.61. The Beaumont counties of Jefferson, Orange, and Hardin share a $15.68 floor." },
      { kind: "p", text: "A floor below market means the contract minimum does not clear the rate needed to staff the post. The bid has to price above the determination or the contract runs short-staffed. A floor above market, which appears in a smaller set of counties, means the contract wage is the local premium and recruiting is easier than the determination implies." },
    ],
  },
]

export const bySection = (s: Piece["section"]) => PIECES.filter((p) => p.section === s)
export const bySlug = (slug: string) => PIECES.find((p) => p.slug === slug)
