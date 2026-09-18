import { Eyebrow, Heading, Text } from "@/components/primitives"
import { Band } from "@/components/site/Band"

export default function About() {
  return (
    <Band className="py-16">
      <Eyebrow>About</Eyebrow>
      <Heading level={1} className="mt-3 max-w-3xl">Every federal contract dollar is public. Government Contracted reads it.</Heading>
      <Text size="body-lg" tone="muted" className="mt-6 max-w-[65ch]">
        Government Contracted covers the federal procurement market for the companies that operate in it: where agency demand is moving, which contracts are reaching expiration, what the primes are buying from subcontractors, and what the public record says about wages and awards. Every figure is drawn from the record and dated.
      </Text>
    </Band>
  )
}
