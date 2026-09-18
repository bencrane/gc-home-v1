import type { Piece, Frozen } from "./types"
import record from "@/fixtures/record_fy25.json"
import flows from "@/fixtures/flows_fy25.json"
import expiring from "@/fixtures/expiring_561.json"
import subunder from "@/fixtures/subunder_236.json"
import whowon from "@/fixtures/whowon_2026_05.json"
import wage from "@/fixtures/wage_tx_guard2.json"
import record24 from "@/fixtures/record_fy24.json"
import setaside from "@/fixtures/record_setaside_fy23_25.json"
import states from "@/fixtures/flows_state_fy25.json"
import exp236 from "@/fixtures/expiring_236.json"
import exp541 from "@/fixtures/expiring_541.json"
import sub562 from "@/fixtures/subunder_562.json"
import sub541 from "@/fixtures/subunder_541.json"
import won06 from "@/fixtures/whowon_2026_06.json"
import won04 from "@/fixtures/whowon_2026_04.json"
import wageCa from "@/fixtures/wage_ca_janitor.json"
import wageFl from "@/fixtures/wage_fl_guard2.json"

const F = (x: unknown) => x as Frozen
const NAICS3: Record<string, string> = { "336": "Transportation equipment", "541": "Professional services", "236": "Building construction", "621": "Ambulatory health care", "524": "Insurance", "324": "Petroleum products", "325": "Chemicals & pharma", "523": "Securities & funds", "562": "Remediation", "561": "Facilities support", "237": "Heavy civil", "423": "Wholesale durables", "334": "Electronics" }
const SETASIDE_NAMES: Record<string, string> = { SBA: "Small business set-aside", "8AN": "8(a) sole source", SDVOSBC: "Service-disabled veteran-owned", "8A": "8(a) competed", WOSB: "Women-owned", HZC: "HUBZone", SBP: "Partial small business", EDWOSB: "Economically disadvantaged WOSB", VSA: "Veteran-owned" }
const setasideFy25: Frozen = { ...F(setaside), rows: F(setaside).rows.filter((r) => r.fy === 2025 && r.set_aside !== "NONE" && SETASIDE_NAMES[String(r.set_aside)]).map((r) => {
  const prev = F(setaside).rows.find((x) => x.fy === 2023 && x.set_aside === r.set_aside)
  const pct = prev ? (100 * (Number(r.obl) - Number(prev.obl))) / Number(prev.obl) : null
  return { ...r, name: SETASIDE_NAMES[String(r.set_aside)], pct: pct == null ? null : Math.round(pct * 10) / 10 }
}) }
const STATE_NAMES: Record<string, string> = { VA: "Virginia", TX: "Texas", CA: "California", MD: "Maryland", CT: "Connecticut", FL: "Florida", DC: "District of Columbia", PA: "Pennsylvania", AZ: "Arizona", MA: "Massachusetts", AL: "Alabama", CO: "Colorado", WA: "Washington", GA: "Georgia", MO: "Missouri", OH: "Ohio", NY: "New York", IL: "Illinois", NJ: "New Jersey", MS: "Mississippi" }
const statesNamed: Frozen = { ...F(states), rows: F(states).rows.map((r) => ({ ...r, name: STATE_NAMES[String(r.pop_state)] ?? r.pop_state })) }
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
  {
    slug: "defense-fell-2-percent-in-fy24-as-gsa-and-va-grew",
    title: "Defense Fell 2% in FY24 While GSA and VA Grew Fastest",
    dek: "The year before the rebound, the Pentagon gave back $10.8 billion. General Services grew 10.5% and Veterans Affairs 8.4%. Treasury and Justice shrank most.",
    section: "markets", format: "record", formatName: "The Record",
    publishedAt: "2026-09-11", byline: "GC Staff",
    body: [
      { kind: "p", text: "Fiscal 2024 was the down year in the Defense record. The department obligated $446.0 billion, $10.8 billion or 2.4% less than FY23, across 47,666 recipients. The FY25 rebound to $491.8 billion started from that base." },
      { kind: "ledger", heading: "Obligations by awarding agency · FY24", data: F(record24), label: "agency", value: "obl", valueFormat: "money", delta: "pct", source: SRC },
      { kind: "p", text: "The growth in FY24 was civilian. General Services Administration rose 10.5% to $27.0 billion and Veterans Affairs rose 8.4% to $66.9 billion. Energy added 3%. Health and Human Services, at $36.8 billion, was already down 4.5% before its 27% fall the following year." },
      { kind: "p", text: "Treasury lost 9.5% and Justice 7.1%. State and Agriculture were flat. Read against FY25, the two years describe a market that rotated from civilian services toward Defense hardware in a single fiscal cycle." },
    ],
  },
  {
    slug: "set-aside-dollars-flat-since-fy23-hubzone-fell-13-percent",
    title: "Set-Aside Dollars Are Flat Since FY23 and HUBZone Fell 13%",
    dek: "Small-business set-asides obligated $33.6 billion in FY25, up 2% on two years. 8(a) sole-source and service-disabled veteran programs both shrank. Women-owned grew 10%.",
    section: "markets", format: "record", formatName: "The Record",
    publishedAt: "2026-09-09", byline: "GC Staff",
    body: [
      { kind: "figures", source: SRC, figures: [
        { label: "Small business set-aside · FY25", value: "$33.6B", sub: "38,832 recipients" },
        { label: "HUBZone · two-year change", value: "−13.1%", sub: "$1.0B to $869M" },
        { label: "Women-owned · two-year change", value: "+10.0%", sub: "1,597 recipients" },
      ]},
      { kind: "p", text: "Across the three fiscal years since FY23, the socioeconomic set-aside programs moved little in aggregate and unevenly by program. The small-business set-aside itself grew from $32.9 billion to $33.6 billion while its recipient count fell from 40,431 to 38,832: fewer firms, slightly more dollars each." },
      { kind: "ledger", heading: "Set-aside obligations by program · FY25 with change since FY23", data: setasideFy25, label: "name", value: "obl", valueFormat: "money", delta: "pct", source: SRC },
      { kind: "p", text: "8(a) sole-source awards fell from $10.2 billion to $9.8 billion and competed 8(a) from $4.5 billion to $4.1 billion. Service-disabled veteran-owned set-asides fell 5% to $8.3 billion even as recipients rose to 3,301. HUBZone lost 13%." },
      { kind: "p", text: "Women-owned small business set-asides are the exception, up 10% to $1.1 billion with 1,597 recipients. At one seventh of a percent of total obligations, the program remains small against the $700 billion competed without a set-aside." },
    ],
  },
  {
    slug: "virginia-took-120-billion-of-fy25-obligations-texas-86",
    title: "Virginia Took $120.6 Billion of FY25 Work, Texas $86.3 Billion",
    dek: "Place of performance concentrates in five states. Virginia, Texas, California, Maryland, and Connecticut carry $344 billion, nearly half of all obligations with a stated location.",
    section: "markets", format: "flows", formatName: "Flows",
    publishedAt: "2026-09-08", byline: "GC Staff",
    body: [
      { kind: "p", text: "By place of performance, federal contract dollars in FY25 landed first in Virginia at $120.6 billion across 11,144 recipients. Texas followed at $86.3 billion and California at $62.0 billion, the latter with the most recipients of any state at 13,672." },
      { kind: "ledger", heading: "Obligations by place of performance · FY25", data: statesNamed, label: "name", value: "obl", valueFormat: "money", sub: "pop_state", source: SRC },
      { kind: "p", text: "Connecticut is the outlier: $35.1 billion across only 1,640 recipients, a concentration produced by submarine construction at Electric Boat. Maryland's $39.7 billion and the District's $31.4 billion round out the Washington region at $191.7 billion including Virginia." },
      { kind: "p", text: "Arizona, Alabama, and Colorado each carry between $16 billion and $24 billion, largely on aerospace and defense installations. A contractor's addressable market is a function of where it can perform, and these fifteen states hold most of it." },
    ],
  },
  {
    slug: "hensel-phelps-650-million-florida-contract-ends-in-days",
    title: "Hensel Phelps' $650 Million Florida Build Ends This Month",
    dek: "Federal building construction has $4.4 billion in awards ending within 180 days. Two end in July, six in September and November, and State Department embassy work accounts for a third.",
    section: "markets", format: "expiring", formatName: "Expiring",
    publishedAt: "2026-09-06", byline: "GC Staff",
    body: [
      { kind: "p", text: "The nearest large expiration in building construction (NAICS 236) is Hensel Phelps' $651.9 million Defense award in Florida, fully obligated and ending July 26. American International Contractors' $241 million State Department project ends the same day." },
      { kind: "ledger", heading: "Building construction awards ending within 180 days · by current value", data: F(exp236), label: "recipient", sub: "agency", value: "current_value", valueFormat: "money", source: SRC },
      { kind: "p", text: "The largest on the list is the BAH-ICM joint venture's $660.3 million Defense award ending November 5, followed by Core Tech-HDCC-Kajima's $584.1 million Guam project ending September 9. Guam appears twice; Core Tech International holds a second $218.4 million award ending November 13." },
      { kind: "p", text: "State Department embassy construction is a distinct market inside this list: BL Harbert holds three awards worth $939 million ending between September and November, and Caddell holds $232 million ending December 31. These are fixed-scope projects that complete rather than recompete, and the firms will be bidding the next embassy." },
    ],
  },
  {
    slug: "argonne-17-billion-lab-contract-ends-september-30",
    title: "Argonne's $17.9 Billion Lab Contract Ends September 30",
    dek: "Professional and technical services has $47 billion in awards ending within 180 days. Two national laboratory contracts, two USAID programs, and five Defense engineering awards lead the list.",
    section: "markets", format: "expiring", formatName: "Expiring",
    publishedAt: "2026-09-04", byline: "GC Staff",
    body: [
      { kind: "p", text: "UChicago Argonne's management and operating contract for Argonne National Laboratory, valued at $17.9 billion with $17.3 billion obligated, reaches its current end date on September 30. Oak Ridge Associated Universities' $3.5 billion Department of Energy award ends the same day." },
      { kind: "ledger", heading: "Professional services awards ending within 180 days · by current value", data: F(exp541), label: "recipient", sub: "agency", value: "current_value", valueFormat: "money", source: SRC },
      { kind: "p", text: "Chemonics International holds two USAID awards worth $10.9 billion combined, both ending November 28, in a year when the agency's obligations nearly halved. Whether those programs are extended is the largest open question on the list." },
      { kind: "p", text: "Defense engineering rounds it out: BAE Systems' $2.4 billion award in Maryland ends July 31, Raytheon's $1.8 billion in California and JT4's $1.7 billion in Nevada end September 30, and Electric Boat's $1.6 billion in Connecticut ends November 30. Booz Allen and SAIC each have $1.4 billion GSA vehicles ending in the window." },
    ],
  },
  {
    slug: "hanford-primes-bought-400-million-of-cleanup-capacity",
    title: "Two Hanford Primes Bought $409 Million of Cleanup Capacity",
    dek: "Remediation sub-awards concentrate at Department of Energy sites. Hanford Tank Waste Operations and Central Plateau Cleanup placed 742 sub-awards to 210 firms in two years.",
    section: "markets", format: "subunder", formatName: "Sub-Under",
    publishedAt: "2026-09-03", byline: "GC Staff",
    body: [
      { kind: "p", text: "In remediation services (NAICS 562), the largest buyers of subcontracted work are the Department of Energy's site contractors. Hanford Tank Waste Operations & Closure placed $277.5 million across 385 sub-awards to 117 firms since August 2024, and Central Plateau Cleanup Company $131.1 million across 357 sub-awards to 93 firms." },
      { kind: "ledger", heading: "Sub-award volume under remediation primes · trailing 24 months", data: F(sub562), label: "prime", value: "sub_amount", valueFormat: "money", source: "USAspending FSRS via core-x query sidecar, snapshot 2026-08-02" },
      { kind: "p", text: "EA Engineering is the largest non-DOE buyer at $97.2 million across 79 subs. AECOM, Newport News Nuclear BWXT-Los Alamos, and Idaho Environmental Coalition follow. Salado Isolation Mining Contractors placed the most individual sub-awards, 571 to 190 firms, at a smaller $27 million." },
      { kind: "p", text: "For an environmental services firm, the Energy site contractors are a market of their own: long-duration, high-volume, and buying from a wide base of subcontractors. The Hanford pair alone is a wider door than the rest of the list combined." },
    ],
  },
  {
    slug: "gdit-and-booz-allen-each-placed-2-9-billion-in-sub-awards",
    title: "GDIT and Booz Allen Each Placed $2.9 Billion in Sub-Awards",
    dek: "Professional services is the deepest subcontracting market in the record. Twelve primes placed $20 billion across 14,000 sub-awards in two years, and Booz Allen used 1,072 distinct firms.",
    section: "markets", format: "subunder", formatName: "Sub-Under",
    publishedAt: "2026-09-02", byline: "GC Staff",
    body: [
      { kind: "p", text: "General Dynamics Information Technology placed $2.9 billion across 3,091 sub-awards to 898 firms since August 2024. Booz Allen Hamilton placed the same dollar volume across 2,893 sub-awards to 1,072 firms, the widest subcontractor base of any prime in professional services (NAICS 541)." },
      { kind: "ledger", heading: "Sub-award volume under professional services primes · trailing 24 months", data: F(sub541), label: "prime", value: "sub_amount", valueFormat: "money", source: "USAspending FSRS via core-x query sidecar, snapshot 2026-08-02" },
      { kind: "p", text: "SAIC and CACI placed $2.4 billion and $2.3 billion. Deloitte, Peraton, and Perspecta each placed between $1.5 billion and $1.7 billion. The twelve largest buyers together placed roughly $20 billion, an order of magnitude more than the construction or remediation markets." },
      { kind: "p", text: "The ratio of sub-awards to distinct firms tells the shape of each prime's supply base. Leidos placed 1,063 sub-awards to 256 firms, a concentrated bench. Booz Allen's 2.7 sub-awards per firm is the most open. A services firm seeking prime relationships should read the second column, not the first." },
    ],
  },
  {
    slug: "fisher-sand-and-gravel-takes-2-6-billion-in-june",
    title: "Fisher Sand & Gravel Takes $2.6 Billion in June's Largest Award",
    dek: "Homeland Security border construction produced the two biggest awards of the month. Veterans Affairs placed $3.8 billion in community care with TriWest and Optum.",
    section: "briefings", format: "whowon", formatName: "Who Won",
    publishedAt: "2026-09-13", byline: "GC Staff",
    body: [
      { kind: "p", text: "Fisher Sand & Gravel's $2.6 billion Homeland Security task order in Texas, awarded June 2, was the largest new federal contract award of the month and the largest border construction award in the record. SLS Federal Services took $1.3 billion in Arizona under the same program on June 26." },
      { kind: "ledger", heading: "Largest new awards · June 2026", data: F(won06), label: "recipient", sub: "agency", value: "obligation", valueFormat: "money", source: SRC },
      { kind: "p", text: "Veterans Affairs community care dominated the rest of the list. TriWest Healthcare Alliance took two awards worth $1.78 billion and Optum Public Sector Solutions three worth $2.01 billion, all under the department's insurance and health-services codes and all on June 17 and 25." },
      { kind: "p", text: "Below the top seven, Brasfield & Gorrie took $230 million of DHS construction in South Carolina, Kiewit $103 million from Interior in California, and JAG Ketchikan $99.6 million from Commerce for shipbuilding in Alaska. Elbit America's $86 million DHS award in Texas is border surveillance equipment." },
    ],
  },
  {
    slug: "barnard-construction-1-6-billion-border-award-leads-april",
    title: "Barnard Construction's $1.6 Billion Border Award Led April",
    dek: "Three DHS construction awards and four VA health awards made up April's top ten. McKesson's $1.2 billion pharmaceutical order was the largest non-construction, non-care award.",
    section: "briefings", format: "whowon", formatName: "Who Won",
    publishedAt: "2026-09-05", byline: "GC Staff",
    body: [
      { kind: "p", text: "Barnard Construction Company's $1.6 billion Homeland Security award in Texas on April 24 was the month's largest, the first of the border construction awards that would dominate May and June. Fisher Sand & Gravel took $847 million in California two days later, and Whiting-Turner $400 million in New Jersey." },
      { kind: "ledger", heading: "Largest new awards · April 2026", data: F(won04), label: "recipient", sub: "agency", value: "obligation", valueFormat: "money", source: SRC },
      { kind: "p", text: "Veterans Affairs placed $3.7 billion in four awards to Optum and TriWest on April 15 and 16, the start of a pattern that repeated in June. McKesson's $1.2 billion pharmaceutical distribution award and Orano Federal Services' $900 million Department of Energy award in Maryland were the largest outside construction and care." },
      { kind: "p", text: "Booz Allen's $171 million VA information technology award, Record Steel's $129 million Interior project in Wyoming, and Shionogi's $119 million HHS research award close the list." },
    ],
  },
  {
    slug: "california-janitor-floor-sits-2-under-market-in-central-valley",
    title: "California's Janitor Floor Sits $2.24 Under Market in the Central Valley",
    dek: "The Service Contract Act rate for janitors runs from $17.51 in Fresno to $18.32 in San Bernardino against a state market median of $19.75. Every listed county is below market.",
    section: "briefings", format: "wage", formatName: "Wage Floor",
    publishedAt: "2026-09-07", byline: "GC Staff",
    body: [
      { kind: "p", text: "In California, the Service Contract Act wage determination for janitors is below the state's market median in every county on the list. Fresno and Madera set the floor at $17.51 against a $19.75 median for janitors and cleaners (SOC 37-2011), a $2.24 gap." },
      { kind: "ledger", heading: "Janitor · SCA floor vs California market median, by county", data: F(wageCa), label: "county_name", value: "floor_hourly", valueFormat: "hourly", source: "SAM.gov wage determinations and BLS OEWS via core-x query sidecar" },
      { kind: "p", text: "Imperial and Tulare sit at $17.56. Los Angeles and Orange, the largest labor markets in the state, share a $17.73 floor, $2.02 under market. San Diego is $17.79. The gap narrows in the north and the coast: Butte $18.23, San Bernardino $18.32." },
      { kind: "p", text: "A facilities contractor bidding federal janitorial work in California prices above the determination in every one of these counties or fails to staff. The floor is not the wage; it is the amount below the wage that the bid must make up." },
    ],
  },
  {
    slug: "florida-guard-floor-meets-market-in-sumter-beats-it-on-the-panhandle",
    title: "Florida's Guard Floor Meets Market in Sumter and Beats It on the Panhandle",
    dek: "Guard II wage determinations in Florida run within a dollar of the $17.26 market median. In nine of twelve counties the contract rate is the higher number.",
    section: "briefings", format: "wage", formatName: "Wage Floor",
    publishedAt: "2026-09-01", byline: "GC Staff",
    body: [
      { kind: "p", text: "Florida is the counter-example to Texas. The Service Contract Act floor for a Guard II sits within 65 cents of the state's market median of $17.26 in every listed county, and in most of them the floor is above it. Sumter County's $17.26 matches the market exactly." },
      { kind: "ledger", heading: "Guard II · SCA floor vs Florida market median, by county", data: F(wageFl), label: "county_name", value: "floor_hourly", valueFormat: "hourly", source: "SAM.gov wage determinations and BLS OEWS via core-x query sidecar" },
      { kind: "p", text: "Highlands and Marion are the only counties where the market pays more than the contract, by 53 and 44 cents. Tallahassee's four counties, Gadsden, Jefferson, Leon, and Wakulla, set $17.40. Flagler, Volusia, Gulf, and Bay set $17.90 to $17.91, 64 to 65 cents above market." },
      { kind: "p", text: "Where the floor exceeds the market, the contract wage is the local premium. Recruiting is easier than the determination suggests and the bid can price at the floor. Where it falls short, as in Highlands, the bid carries the difference." },
    ],
  },
]

PIECES.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
export const bySection = (s: Piece["section"]) => PIECES.filter((p) => p.section === s)
export const bySlug = (slug: string) => PIECES.find((p) => p.slug === slug)
