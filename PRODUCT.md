# Product

gc-home-v1 — an ultra-matte, high-density financial terminal UI. All fields below are inferred from the setup brief; none are user-confirmed yet.

## Platform
web

## Stack
Vite 8 + React 18 + TypeScript 6, Tailwind CSS 4, shadcn/ui (radix-nova preset, Radix primitives, Geist), Tremor, ECharts. Animation and composition: gsap, remotion, hyperframes (data-visualization animation and component composition only). Design authority: DESIGN.md at the project root.

## Users
Operators reading dense financial and market data for long sessions: traders, analysts, GTM operators who scan tabular numbers, tickers, and time series continuously. (inferred)

## Product Purpose
Present maximal structured data per viewport with zero decorative noise, in the register of a Bloomberg Terminal. (inferred)

## Positioning
Instrument, not brochure. Every pixel is either data, a separator, or a control. (inferred)

## Operating Context
Dark rooms, multi-monitor, long dwell time, keyboard-first navigation. Screens are scanned, not read. (inferred)

## Capabilities and Constraints
- Dense tables, tickers, time series, P&L panels, watchlists, order blotters.
- Numerals are monospace with tabular figures, right-aligned.
- Elevation is flat: surface ladder plus 1px hairlines only. No shadows, glow, blur, or gradients.
- Motion is reserved for data-viz transitions (value changes, series reveal); no decorative animation.

## Brand Commitments
Single accent (#5e6ad2) for focus and active selection only. Positive/negative semantic colors for P&L direction. Nothing else chromatic.

## Evidence on Hand
None yet. No real users, benchmarks, or testimonials exist; do not invent any.

## Product Principles
1. Density over whitespace. 2. Structure over expression. 3. Matte over glossy. 4. Numbers are the hero.

## Accessibility & Inclusion
WCAG AA contrast on the dark surface ladder is mandatory. Keyboard navigation for every control. prefers-reduced-motion disables all data-viz animation.
