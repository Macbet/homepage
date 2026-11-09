---
target: new landing page (src/app/page.tsx)
total_score: 23
max_score: 32
na_heuristics: 5,9
p0_count: 0
p1_count: 3
target_identity: "file:/private/tmp/claude-501/-Users-dkivenko-project-github-terrakube/b3f0f05d-f98a-4515-a54c-b97050db36b2/scratchpad/homepage/src/app/page.tsx"
target_fingerprint: "sha256:d578764b9cf0e6643053f12d94102c4a6242d6aed374fbf883b7af746d60a98c"
target_path: /private/tmp/claude-501/-Users-dkivenko-project-github-terrakube/b3f0f05d-f98a-4515-a54c-b97050db36b2/scratchpad/homepage/src/app/page.tsx
timestamp: 2026-11-09T00-43-40Z
slug: src-app-page-tsx
---
Method: dual-agent (A: critique-a · B: critique-b). Target: src/app/page.tsx (terrakube.io landing, Persuade mode), production build at localhost:3100, 2026-11-09.

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Sticky header, but no anchor nav to #features/#support/#community over ~7,000px |
| 2 | Match system / real world | 3 | "Custom workflows" heading links to "Templates" |
| 3 | User control and freedom | 2 | 23 links open new tabs, only 12 show ↗; hamburger has no Esc/outside-click close |
| 4 | Consistency and standards | 4 | Faithful tokens; only `.sponsors` hard-codes #ffffff |
| 5 | Error prevention | n/a | No inputs |
| 6 | Recognition over recall | 2 | Eleven equal rows; three screenshots do not depict their feature |
| 7 | Flexibility and efficiency | 2 | No anchors, no copyable install command |
| 8 | Aesthetic and minimalist | 3 | Backdrop nodes collide with hero text; eleven full-frame screenshots are noise at rendered size |
| 9 | Error recovery | n/a | Static page |
| 10 | Help and documentation | 4 | Every feature deep-links to its docs |
| Total | | 23/32 | Good (72%) |

## Design specificity verdict
System-faithful, product-anonymous. Honors the control-room system (graphite frame, one accent, flat borders) but uses none of its expressive slots: no monospace "machine truth", no status-colour line, screenshots spent carelessly (Open source → workspace overview, Dynamic credentials → run output, Self-hosted → hero image again, SSO → password form next to six IdPs). h1 is a category label; the strongest line is buried in the lede.

Deterministic scan: `impeccable detect --json src/app` → 0 findings; browser detector: "No anti-patterns found". Manual measurements (B): `.hero-meta` light 3.29:1; 22/25 tap targets < 44px at 390px; 23 target=_blank links with no accessible new-tab hint; no horizontal overflow; all images have alt; heading order valid.

## Priority issues
- [P1] Login backdrop collides with hero text (background-size 100%). Fix: pin right, fixed width (~720px), hide < 768px. → /impeccable layout
- [P1] Wrong/duplicate screenshots (4 of 11); hero image repeated in row 11 with the same alt. Fix: crop to the proving detail; Helm/Compose snippet in mono for Self-hosted; SSO shows provider buttons. → /impeccable bolder
- [P1] Eleven equal rows, one h2, no nav, no closing CTA. Fix: three groups (Run / Secure / Host), compact grid for minor features, repeat Get started at the end. → /impeccable distill
- [P2] `.hero-meta` light contrast 3.29:1 at 13px. Fix: --tk-text-secondary or 14px. → /impeccable audit
- [P2] New tabs without indication (nav, hero buttons, Slack, support cards, footer); `.sponsors` hard-coded white. Fix: drop _blank on Get started/footer, visually hidden hint elsewhere, token the fill. → /impeccable harden
- [P3] Tap targets: hamburger 32px, doc links 22px, footer links 15.6px, Slack 32px; no Esc close. → /impeccable adapt

## Persona red flags
- Jordan: "workspace" never defined; Private agents / Dynamic credentials start mid-concept; Get started opens a deployment index in a new tab; the orienting hero-meta line is the lowest-contrast text.
- Riley: duplicated hero image, password form under SSO, screenshots do not zoom, "Trusted by" overclaims (rename "Supported by"), Custom workflows vs Templates.
- Casey: 32px hamburger at the edge, eleven illegible 358px screenshots, backdrop nodes under the headline at 390, two-item list split in two columns, no CTA after 7,600px.

## Minor observations
Hero image served 960×481, rendered 1151×577 (upscaled). Feature images declare 800×450 with mixed intrinsic sizes. "Get involved" bullets unlinked. `columns: 2` reorders five-item lists. `.hero-meta code` unused. `<title>` has no tagline/OG. Sponsor logos are PNG. Support card inner `.doc-link` is decorative. Narrow-width checks ran via iframe and saved screenshots (window would not shrink below 1600px).

## Questions
1. Which single screenshot proves "self-hosted automation for Terraform and OpenTofu" alone, and why is it not the hero image?
2. Why does a page selling a Helm-installable platform contain zero monospace characters?
3. Who is "Support the project" for on first visit, and what earned the ask?
