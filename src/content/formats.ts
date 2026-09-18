import type { Format } from "./types"

/** The six formats as site sections (docs/formats/FORMATS.md). Order is the masthead order. */
export const FORMATS: { id: Format; name: string; blurb: string }[] = [
  { id: "record", name: "The Record", blurb: "Obligations by agency, sector, and set-aside for a fiscal period." },
  { id: "flows", name: "Flows", blurb: "Where obligations moved between agencies, industries, and states." },
  { id: "expiring", name: "Expiring", blurb: "Contracts reaching the end of performance in the next 180 days." },
  { id: "subunder", name: "Sub-Under", blurb: "The demand primes place on subcontractors, by work lane." },
  { id: "whowon", name: "Who Won", blurb: "The month's largest new awards and who took them." },
  { id: "wage", name: "Wage Floor", blurb: "Service Contract Act floors against county market wages." },
]
export const formatById = (id: string) => FORMATS.find((f) => f.id === id)
