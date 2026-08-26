# Gokakudo Autonomous Operations

This repository powers the Japanese qualification-exam learning site Gokakudo.
Automated agents may research, edit, test, commit, deploy, verify, and optimize it without waiting for routine approval.

## North Star

- Primary metric: Google Search Console organic clicks over complete rolling 28-day windows.
- Supporting metrics: impressions, average position, CTR, indexed high-value pages, non-brand query coverage, Bing clicks/impressions, and GA4 organic sessions.
- Every change must improve at least one of coverage, ranking, or CTR. Do not publish merely to keep a schedule busy.

## Data Priority

1. GSC and GA4 for actual site performance.
2. Bing Webmaster for early query, page, rank, and indexing signals.
3. SEMrush for market, competitor, keyword-gap, and SERP estimates. Access only through `dash.3ue.co` to `sem.3ue.co`; never visit the SEMrush official domain.
4. Current site content, official sources, and live SERP evidence.

If a source is unavailable, record the failure and continue with the remaining evidence. Never present stale data as current.

## Content And Exam Expansion

- For published official questions, competitor-organized question banks may be used as the first acquisition source for question text, choices, answers, subject, and session metadata. Official exam sites and primary legal sources are the fallback and cross-check sources.
- Do not copy competitor-authored explanations, comments, ratings, branding, images, or other proprietary additions.
- There is no human sampling step. The agent owns automated validation, multi-source conflict checks, source/date recording, build verification, and the publish decision.
- Never claim human review, professional review, official affiliation, credentials, pass guarantees, or facts that cannot be verified.
- A question with unresolved answer conflicts must not be published. Imported question sets must pass count, numbering, answer-range, choice-count, duplicate, and subject-distribution checks when those constraints are known.
- Launching a qualification with one official session is only the starting point, never the completion criterion. After launch, keep it in the active backfill queue and ingest discoverable official sessions from newest to oldest until at least 90% of the reasonably obtainable official archive is covered or all sources are exhausted.
- Track each qualification's discoverable sessions, imported sessions, published questions, index-eligible question pages, unresolved conflicts, latest covered session, oldest covered session, and archive coverage percentage in `docs/question-coverage.md`. Update it in every question-import run.
- When a new official session appears, acquire and validate it within 72 hours when the source is accessible. It may enter the practice product immediately, but search indexing follows the rollout gates below.
- Allocate normal weekly execution capacity approximately 40% to official-question backfill (reduced cadence since 2026-08-26: default 1 session per run), 35% to researching and launching new qualifications (target: one new qualification per week, each still gated on demand, SERP feasibility, stable official question sources, and a useful initial content set; no shell pages), and 25% to ranking/CTR/content improvements. Urgent indexing, correctness, or production incidents may override this split.
- Backfill frequency is adaptive. Continue acquiring complete sessions when valid sources exist, but do not force a weekly public index expansion when prior releases have not earned healthy crawl, index, or impression signals. Do not replace archive backfill with prediction questions merely because original questions are easier to create.
- Prefer expanding existing pages that already have impressions before creating unrelated pages, while still honoring the official-question backfill allocation. Launch a new qualification only when keyword demand, SERP feasibility, source availability, and a useful initial content set are all demonstrated.

## Question Index Rollout

- Separate archive completeness from Google index growth. Questions may be stored, validated, and available in practice mode without making every single-question URL indexable.
- New imported official single-question pages default to `noindex,follow` and stay out of the sitemap. Qualification hubs, subject hubs, and useful session pages carry the initial search demand.
- Promote single-question pages to index only when they have independent search intent or enough unique value, such as a verified explanation, misconception analysis, primary-source context, related concepts, and meaningful internal links.
- Release indexable question pages in controlled waves. Choose the wave size from current site authority and GSC evidence; for a young site, normally start with 10-30 pages rather than an entire archive.
- Before the next wave, review at least the previous 14 complete days when available. Prefer continuing only when the prior wave shows healthy discovery/indexing, no material rise in `Crawled - currently not indexed` or duplicate/canonical exclusions, and at least 70% of submitted high-value URLs are indexed. If the indexed share is below 50% or quality exclusions rise, pause expansion and improve, consolidate, or remove weak pages.
- When GSC data is unavailable or too sparse, use the conservative path: keep question pages noindex, index the richer hub/session pages, and avoid large sitemap growth.
- The sitemap must contain only canonical URLs intentionally eligible for indexing. Do not submit noindex question pages through GSC or IndexNow.

## Search Quality Boundaries

- Do not use cloaking, hidden text, doorway pages, fake authority, fabricated data, keyword stuffing, link schemes, purchased links, spam outreach, automated third-party posting, or bypass access controls.
- Do not create near-duplicate or unsupported programmatic pages. Consolidate overlapping intent and prevent keyword cannibalization.
- Use Japanese appropriate for the target search intent. Automated Japanese quality checking replaces human review; do not label it as native-speaker review.

## Implementation And Release

- Inspect the current worktree before editing. Preserve changes not created by the current run; never reset, checkout, or delete them.
- Keep SEO-critical content server-rendered. Maintain one H1, self-canonical HTTPS URLs, descriptive titles/descriptions, valid JSON-LD, relevant internal links, and sitemap/robots consistency.
- Before deployment run `npm run build`, targeted checks, and `git diff --check`. Page changes require responsive checks at mobile and desktop widths with no overflow or console errors.
- Commit only the current run's verified changes. Never commit credentials, caches, `dist`, `work`, browser artifacts, or downloaded temporary files.
- Deploy with the existing `npm run deploy` workflow only after all required checks pass. Verify production status, canonical, metadata, schema, sitemap, robots, and affected routes after deployment.
- Submit only genuinely new or materially improved high-value URLs for indexing. Respect GSC request quotas and avoid repeated submissions.

## Operating Record

- Maintain `docs/seo-growth-log.md` with the data cutoff, baseline, evidence, chosen opportunity, changed URLs, affected traffic lever, tests, deployment version, expected observation window, and follow-up result.
- When evidence does not justify a change, record the diagnosis and candidate opportunities instead of forcing a release.
- Request user intervention only for authentication, CAPTCHA, payment, missing credentials, an external legal decision, or a Git conflict that cannot be resolved without risking user work.
