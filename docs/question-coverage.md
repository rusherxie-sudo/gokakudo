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
| 第一種衛生管理者 | 24 | 5 | 220 | 220 | 20.8% | 19 sessions / ~834 questions (20049+ need old-format importer) | Active backfill; all imported single-question pages indexable; monitor GSC before further expansion |
| 危険物取扱者 乙種4類 | Discovery pending | 0 | 0 | 0 | Pending | Determine competitor and official archives | Discovery required |
| 第二種衛生管理者 | 19 | 2 | 60 | 60 | 10.5% | 17 sessions / 510 questions | Backfill active newest→oldest (57022→57006); 57024 全問に根拠つき解説を追加 |

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
- Per operator request, released a controlled wave of official single-question pages: the newest session's questions 1–30 (`/exams/eisei-kanrisha/questions/official-20054-q01/` … `q30/`) became `index,follow` and entered the sitemap (sitemap is now 70 URLs). The other 190 official single pages remain `noindex,follow` and outside the sitemap until they gain verified explanations and GSC evidence supports further waves.

### 2026-08-26 (index expansion)

- Operator guidance: be cautious but not overly conservative; the site must not have too few indexable pages. Applied by making all 220 imported official single-question pages `index,follow` and adding them to the sitemap (sitemap is now 260 URLs: 35 base + 5 session + 220 official).
- Monitoring gate remains: when GSC data becomes available, check indexing share of submitted URLs (prefer ≥70%; pause/improve if `Crawled - currently not indexed` or duplicate/canonical exclusions rise materially). Priority content work: replace placeholder explanations on official pages with verified, source-based explanations.

### 2026-08-26 (new qualification: 第二種衛生管理者)

- Per the new weekly cadence (operator directive 2026-08-26), launched 第二種衛生管理者 as the first weekly new qualification. Four gates passed: Bing demand (第二種衛生管理者 ~4.6k impressions; 衛生管理者 過去問 ~9k), SERP dominated by apps/book sellers (weak incumbents), stable official source (2eiseikanrisha.kakomonn.com, 19 sessions × 30 questions; exam.or.jp PDFs), and a useful initial set (exam guide + 1 official session 30 questions + practice/review wiring + schema/sitemap).
- Imported newest session `令和8年4月公表` (57024, 30 questions) with the generalized importer; answers cross-checked 30/30 against official PDF LC20260414-1. Subject distribution 10/10/10 (関係法令/労働衛生/労働生理) validated.
- All 30 single-question pages and the session page are `index,follow` and in the sitemap (sitemap now 293 URLs). Backfill queue: 18 remaining sessions (57023→57006), 540 questions.

### 2026-08-27

- Backfilled `令和7年10月公表` (57023, 30 questions) via the kakomonn pipeline. Validated: 30 questions, numbering 1–30, five choices, answer range 0–4, subject distribution 10/10/10, no within-session duplicates; answers cross-checked 30/30 against official PDF LC20252115.
- Note: 57023 Q1 reflects the pre-amendment rule (深夜業30人以上で専任衛生管理者), which was revised effective 令和8年4月1日 (深夜業要件廃止 → 労基法施行規則第18条各号の健康上特に有害な業務要件へ). The 57024 session's Q1 reflects the current rule; the 57024 explanation documents this difference. Both sets keep their own official answer keys.
- Added verified, source-based explanations for all 30 questions of the newest session (57024). Legal questions cite current 安衛法/安衛則/労基法/施行令/事務所衛生基準規則 articles verified against e-Gov; guideline/medical questions cite 厚労省指針・環境省WBGT・日本赤十字社 or the official 協会公表PDF for answer confirmation.
- 第二種衛生管理者 archive coverage: 2/19 sessions (10.5%), 60 usable official questions. Backlog: 17 sessions / ~510 questions (57022→57006).
- Sitemap grew 293 → 324 URLs (30 new single-question pages + 1 new session page).
