// Export the lake's published pieces to src/data/pieces.snapshot.json (tests, offline reference).
import { writeFileSync } from "node:fs"
import { getPieces } from "../src/lib/content"
const pieces = await getPieces()
writeFileSync("src/data/pieces.snapshot.json", JSON.stringify(pieces, null, 1))
console.log(`exported ${pieces.length} pieces`)
