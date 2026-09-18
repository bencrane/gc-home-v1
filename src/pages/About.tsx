import { Section, Eyebrow, Heading, Text } from "@/components/primitives"

export default function About() {
  return (
    <Section spacing="lg" containerWidth="content">
      <Eyebrow>About</Eyebrow>
      <Heading level={1} className="mt-4 max-w-3xl">Every federal contract dollar is public. Government Contracted reads it.</Heading>
      <Text size="body-lg" tone="muted" className="mt-6 max-w-2xl">
        Government Contracted covers the federal procurement market for the companies that operate in it: where agency demand is moving, which contracts are reaching expiration, what the primes are buying from subcontractors, and what the public record says about wages and awards. Every figure is drawn from the record and dated.
      </Text>
    </Section>
  )
}
