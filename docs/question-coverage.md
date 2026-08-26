# Official Question Coverage

This file is the inventory control plane for official-question acquisition. Update it after every discovery, import, validation, publication, or source-status change.

## Coverage Targets

- A qualification is not considered complete after its first official session.
- Backfill runs newest to oldest until at least 90% of reasonably obtainable official sessions are published, or all known sources are exhausted.
- Newly released official sessions have a 72-hour acquisition and validation target when accessible; index rollout remains evidence-driven.
- Unresolved answer conflicts are counted separately and do not count as covered.
- Archive coverage and search-index coverage are separate metrics. A question can count toward the usable archive while its single-question page remains `noindex`.

## Current Inventory

| Qualification | Discoverable sessions | Imported sessions | Usable official questions | Index-eligible single pages | Archive coverage | Backlog | Status |
|---|---:|---:|---:|---:|---:|---:|---|
| 第一種衛生管理者 | 24 | 5 | 220 | 0 | 20.8% | 19 sessions / ~834 questions (20049+ need old-format importer) | Active backfill; imported session pages indexable; single-question pages stay noindex |
| 危険物取扱者 乙種4類 | Discovery pending | 0 | 0 | 0 | Pending | Determine competitor and official archives | Discovery required |

## Update Log

### 2026-08-25

- Established the coverage inventory.
- Confirmed one imported 第一種衛生管理者 session (`令和8年4月公表`, 44 questions).
- Registered 23 known historical 第一種衛生管理者 sessions as the initial backfill queue.
- 危険物乙4 currently has 15 original prediction questions but no imported official session; official archive discovery is required.
- Separated archive completeness from index eligibility. The 44 imported 第一種衛生管理者 official single-question pages remain `noindex,follow` and outside the sitemap.

### 2026-08-26

- Imported `令和7年10月公表` (20053) and `令和7年4月公表` (20052) through the existing kakomonn.com pipeline; archive now 132 usable official questions across 3 sessions.
- Continued backfill after the source rate limit cooled: `令和6年10月公表` (20051) and `令和6年4月公表` (20050) also imported. Archive is now 220 usable official questions across 5 sessions.
- Validated every batch structurally: 44 questions, numbering 1–44, five choices, answer range 0–4, subject distribution 7/7/10/10/10, no within-session duplicates.
- Cross-checked answers against official 安全衛生技術試験協会 PDFs for two sessions: `令和8年4月公表` (LC20260415-1) and `令和7年10月公表` (LC20252114) both matched 44/44.
- 30 prompts repeat across sessions; this matches the official archive (identical questions recur in adjacent published sessions) and is not an import defect.
- kakomonn.com returned HTTP 429 (IP-level rate limit) mid-queue on 2026-08-26; importer now runs at gentler pacing (`GOKAKUDO_MAX_BATCHES`, configurable concurrency and spacing) to avoid re-triggering the block.
- `令和5年10月公表` (20049) uses an older kakomonn page format: the list page exposes 42 question links (not 44) and question titles use a different metadata layout (`科目 問N` without parentheses). It was rejected by validation rather than force-imported. A format-adapted importer plus official-PDF cross-check is required for 20049 and likely for all older sessions (20048 and earlier).
- Index eligibility unchanged: official single-question pages remain `noindex,follow` and outside the sitemap; session pages remain `noindex` until they gain explanations and GSC data supports a wave.

### 2026-08-26 (sitemap follow-up)

- Imported session pages (`/exams/eisei-kanrisha/questions/session/{20054..20050}/`) switched from `noindex,follow` to `index,follow` and added to the sitemap, per the "useful session pages carry initial search demand" rule. Sitemap grew from 35 to 40 URLs and will grow as backfill continues.
- Official single-question pages remain `noindex,follow` and outside the sitemap until they carry verified explanations and GSC evidence supports a wave.
