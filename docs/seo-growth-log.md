# SEO Growth Log

North star: Google Search Console organic clicks over complete rolling 28-day windows.

## Baseline

- Site: https://gokakudo-eisei.rusher-xie.workers.dev/
- Market: Japan
- Language: Japanese
- Topic: qualification examinations and practice questions
- Baseline status: establish from the first complete GSC data pull; compare the latest complete 28 days with the preceding 28 days.

### 2026-08-26 (domain fix)

- Issue: the operator confirmed `gokakudo.com` is the production custom domain (Cloudflare DNS + HTTPS serving the Worker), but the code had hardcoded `https://gokakudo-eisei.rusher-xie.workers.dev` as `SITE_URL` since the initial baseline commit. As a result canonical, sitemap, robots, OG URLs, and the http→https redirect all pointed to the workers.dev subdomain.
- Fix: switched `SITE_URL` and Astro `site` to `https://gokakudo.com`, updated `public/llms.txt`, and added a 301 host redirect from `gokakudo-eisei.rusher-xie.workers.dev` → `gokakudo.com` (same path/query) in `src/middleware.ts` so search engines consolidate on the custom domain.
- Changed URLs: every canonical/sitemap/robots/OG URL (site-wide); no route structure changed.
- Traffic lever: coverage/index hygiene (single canonical host; avoids duplicate-host splitting of the GSC property).
- Verification: `npm run build`, `git diff --check`, local preview confirmed canonical/sitemap/robots point to gokakudo.com; full mobile/desktop render check passed. Production verified after deploy on both hosts (see deployment note).
- Deployment: `5c820b4` → `npm run deploy`; Cloudflare Worker version `2d55cc93-bde1-4435-abe5-d1aac8addae9`. Production verified: `https://gokakudo.com/` 200 with canonical/OG/sitemap/robots on gokakudo.com; `http://gokakudo.com` 308 → `https://gokakudo.com`; `https://gokakudo-eisei.rusher-xie.workers.dev/*` 301 → same path on gokakudo.com.

### 2026-08-26 (sitemap follow-up)

- User asked why the sitemap had 35 URLs instead of 80+. Verified against git history: the sitemap has contained exactly 35 URLs since the initial baseline commit (7 navigation + 5 trust + 8 eisei prediction + 15 otsu4 original); official single-question pages were never in the sitemap (they are `noindex` per the index-rollout policy).
- Action: imported session pages are useful archive pages and were incorrectly left `noindex` in this run. Switched the 5 session pages to `index,follow` and added them to the sitemap (`/exams/eisei-kanrisha/questions/session/{20054..20050}/`). Sitemap is now 40 URLs and will grow to 59+ as backfill completes; official single-question pages stay `noindex` until they gain verified explanations and GSC evidence.
- Changed URLs: 5 session pages (indexing status + sitemap entries).
- Traffic lever: coverage (indexable archive hubs).
- Verification: `npm run build`, `git diff --check`, local sitemap count = 40 with 5 session URLs, session pages carry `index,follow`, full mobile/desktop render check passed.
- Deployment: `npm run deploy`; Worker version recorded below after production verification.

### 2026-08-26 (question-page wave)

- Operator requested that some question pages enter the sitemap while the site is small. Released a controlled wave: newest session (`令和8年4月公表`) questions 1–30 become `index,follow` and are added to the sitemap via `INDEXED_OFFICIAL_WAVE_LIMIT = 30` in `src/data/questions.ts`. Sitemap is now 70 URLs (35 base + 5 session + 30 wave).
- Official single-question pages outside the wave (190) remain `noindex,follow` and outside the sitemap. Next-wave trigger: GSC evidence (healthy discovery/indexing, ≥70% of submitted URLs indexed) plus verified explanations on wave pages.
- Changed URLs: 30 single-question pages (`/exams/eisei-kanrisha/questions/official-20054-q01/`…`q30/`).
- Traffic lever: coverage (indexable single-question pages).
- Verification: `npm run build`, `git diff --check`, sitemap count 70, wave pages `index,follow`, Q31+ `noindex,follow`, full mobile/desktop render check passed.
- Deployment: `cad2508` → `npm run deploy`; Cloudflare Worker version `6d4b4b4e-dad1-4698-8828-efdbc5d01d4c`. Production verified: sitemap 70 URLs (30 wave pages), wave page `index,follow` with gokakudo.com canonical, Q31+ `noindex,follow`, session pages `index,follow`, workers.dev 301 intact.

### 2026-08-26 (index expansion)

- Operator guidance: question-page indexing should be cautious but not overly conservative; too few indexable pages is also a problem. Expanded the release to the full imported archive: all 220 official single-question pages are now `index,follow` and in the sitemap. Sitemap: 70 → 260 URLs (35 base + 5 session + 220 official). Wave-limit constants removed from `src/data/questions.ts`; official single pages now always indexable.
- Remaining guardrail: monitor GSC once available (submitted-URL indexing share; prefer ≥70%; pause/improve if quality exclusions rise). Priority content work: replace placeholder explanations with verified, source-based explanations.
- Changed URLs: 190 additional single-question pages (`official-20054-q31` onward, all sessions).
- Traffic lever: coverage (indexable question-page archive).
- Verification: `npm run build`, `git diff --check`, sitemap 260 (220 official), spot-checked `official-20054-q31` and `official-20050-q44` now `index,follow`, full mobile/desktop render check passed.
- Deployment: `9b42958` → `npm run deploy`; Cloudflare Worker version `b39c9b15-9b99-4fb0-809a-e2f0f2c1f99e`. Production verified: sitemap 260 URLs (220 official), spot pages `index,follow`, gokakudo.com canonical, workers.dev 301 intact.

### 2026-08-26 (new qualification: 第二種衛生管理者)

- Operator directive: reduce backfill cadence (default 1 session/run) and aim to launch one new qualification per week. Applied: `GOKAKUDO_MAX_BATCHES` default 3→1; AGENTS.md allocation updated to ~40% backfill / ~35% new qualifications / ~25% content-CTR.
- First weekly launch: 第二種衛生管理者. Gates: (1) demand – Bing 第二種衛生管理者 ~4.6k, 衛生管理者 過去問 ~9k impressions; (2) SERP – top results dominated by apps and book sellers, weak incumbents; (3) source – 2eiseikanrisha.kakomonn.com (19 sessions × 30 questions) with same platform format, official PDFs on exam.or.jp; (4) initial content – exam guide + 1 official session (30 questions) + practice/review wiring + schema/sitemap.
- Implementation: generalized `scripts/import-kakomonn.mjs` (source base, expected count, expected distribution, both title formats); imported `令和8年4月公表` (57024) – 30 questions, distribution 10/10/10, answers cross-checked 30/30 against official PDF LC20260414-1. New data module `daini-questions.ts`, exams.ts entry (badge 2衛), hub/questions/single/session pages, Header/Footer/home/exams-index/practice wiring, sitemap + llms.txt entries.
- Traffic lever: coverage (new qualification cluster: 33 new indexable URLs; sitemap 293).
- Changed URLs: `/exams/daini-eisei-kanrisha/`, `/exams/daini-eisei-kanrisha/questions/`, `/exams/daini-eisei-kanrisha/questions/session/57024/`, 30 single-question pages; home/exams index/llms/sitemap.
- Verification: `npm run build`, `git diff --check`, 28 mobile/desktop render checks (incl. practice `?exam=daini-eisei-kanrisha`) all pass; canonical on gokakudo.com; official answers 30/30 vs official PDF.
- Deployment: `202c97a` → `npm run deploy`; Cloudflare Worker version `53ed2026-3d1d-4480-bd9b-1f9d90b745fe`. Production verified: home shows 3資格・273問; hub/questions/single/session/practice all 200 with gokakudo.com canonicals; sitemap 293 (33 daini entries); workers.dev 301 intact.

### 2026-08-26 (Baidu Tongji)

- Operator provided the Baidu Tongji HM ID (`df7068d032a103541eda262dd590f61d`); injected the tracking snippet into `BaseLayout.astro` (loaded on idle alongside GA4), allowed `hm.baidu.com` in CSP `script-src`/`connect-src`/`img-src` so the beacon is not blocked, and updated the privacy page to reflect that Baidu Analytics is in use (previously marked as discontinued).
- Changed URLs: all pages (tracking snippet); `/trust/privacy/` (policy text).
- Traffic lever: measurement (supporting data source; no ranking lever).
- Verification: `npm run build`, `git diff --check`, 30 mobile/desktop render checks with no console errors (CSP clean); production confirmed snippet, CSP, and privacy text.
- Deployment: `b743282` → `npm run deploy`; Cloudflare Worker version `31019a55-24d3-4374-abb9-e92d0b29f0c6`.

### 2026-08-27 (backfill + verified explanations for 第二種衛生管理者)

- Data cutoff: 2026-08-27. GSC/GA4 MCP still not exposed in this environment and no local GSC/GA4 credentials were found; recorded as a data-source gap. First GSC 28-day baseline remains to be established.
- Supporting signals (Bing Webmaster keyword research, country=JP, 3-month window, 2026-08-27):
  - Existing qualification demand: 衛生管理者 37,133; 第一種衛生管理者 23,896; 衛生管理者試験日程 10,721; 衛生管理者 過去問 8,972; 第一種衛生管理者 過去問 5,504; 第二種衛生管理者 4,642; 第二種衛生管理者 過去問 1,011; 第二種衛生管理者 過去問 解説付き 744; 第一種衛生管理者 過去問 解説付き 626.
  - Content-gap clusters for future guide pages: 試験日程・受験資格・合格率・難易度・1種2種の違い・勉強時間 (informational; SERP incumbents are official 協会, CIC, u-can).
  - Next-qualification candidates ranked by Bing impressions: 電気工事士2種 44,725; 危険物乙4 50,019 (already live as prediction-only); 損害保険募集人一般試験 22,502; 電験三種 20,160; 一級建築士 12,276; 作業環境測定士 4,335; 安全管理者選任時研修 4,321; 毒劇物取扱責任者 4,119. Candidates for next weekly launch assessment.
  - SEMrush skipped this run: Chrome extension control is not exposed in this session (no browser/Node REPL tool available), recorded as a tool gap; used Bing research + live SERP checks instead.
- Opportunity and evidence: Live SERP checks show the "過去問 解説付き" queries (第一種 626 / 第二種 744 Bing impressions) are dominated by paid book product pages (労働調査会, かんぽう, e-hon) — weak content incumbents, strong fit for the site's free practice + explanation value. The newest daini session (57024) still had placeholder explanations; replacing them with verified, source-based explanations improves index quality of 30 indexable pages and matches the flagged priority content work.
- Traffic lever: ranking/index-quality (unique value on question pages) + CTR (解説付き signals); the backfilled session (57023) enters index per the existing all-official-pages-indexable policy.
- Changed URLs:
  - `/exams/daini-eisei-kanrisha/questions/official-57023-q01/`…`q30/` (new, 30 pages) and `/exams/daini-eisei-kanrisha/questions/session/57023/` (new session page).
  - `/exams/daini-eisei-kanrisha/questions/official-57024-q01/`…`q30/` – placeholder explanations replaced with verified, source-based explanations; new "解説の根拠" source box.
  - `/exams/daini-eisei-kanrisha/`, `/exams/daini-eisei-kanrisha/questions/`, `/exams/daini-eisei-kanrisha/questions/session/57024/` – copy updated (2 sessions, 解説付き); home/exams counts auto-updated to 303問.
  - Sitemap: 293 → 324 URLs; `lastmod` 2026-08-27.
- Verification: structural validation (30/batch, numbering, choices, answer range, distribution 10/10/10, no intra-session duplicates); official-PDF cross-check 30/30 for 57023 (LC20252115) and re-verified 30/30 for 57024 (LC20260414-1); legal citations verified against current e-Gov texts (安衛法, 安衛則, 安衛法施行令, 労基法施行規則, 事務所衛生基準規則), including the 令和8年4月1日 amendment that removed the 深夜業-based 専任衛生管理者 trigger; `npm run build` (0 errors), `git diff --check`, local preview checks: sitemap 324, all 60 daini question pages + 2 session pages 200, one H1, gokakudo.com canonical, index,follow, 解説の根拠 box on 57024 pages, placeholder retained on 57023 pages.
- Deployment: `32b394e` → `npm run deploy`; Cloudflare Worker version `46ef60f3-8c34-4f2b-81e7-7e1dc067cf59`. Production verified: home 303問, sitemap 324 (lastmod 2026-08-27, includes 57023 pages), session/57023 + 30 new question pages 200, 57024 q01 shows 解説の根拠 with verified text, canonical on gokakudo.com, robots intact, workers.dev 301 intact, old session/57024 still 200.
- Expected observation window: 14–28 days; watch GSC once available for `/exams/daini-eisei-kanrisha/` hub, session pages, and 57024 question pages (解説付き queries), plus index share of the 30 new URLs.
- Follow-up result: pending. Next-run candidates: (1) continue daini backfill 57022 (1 session/run), (2) build the 受験ガイド informational cluster (日程・受験資格・合格率・1種2種の違い) only with a verified data table and internal links, (3) extend verified explanations to 第一種 20054 when capacity allows, (4) next weekly qualification launch assessment from the candidate list above (check source availability + SERP feasibility before committing).

## Run Template

### 2026-08-28 (第二種衛生管理者 backfill: 令和7年4月公表)

- Data cutoff: 2026-08-28. GSC/GA4 MCP still not exposed in this environment and no local GSC/GA4 credentials were found (data-source gap unchanged); Bing Webmaster site-stats API still unusable for gokakudo (key registered for another domain); Bing keyword-research API was not re-pulled this run because the opportunity set from 2026-08-27 remains valid and this run focused on the backfill allocation.
- GSC 28-day clicks / previous period: baseline still not measurable (no GSC access); no new search-performance evidence.
- Opportunity and evidence: archive completeness is the long-term constraint (AGENTS.md ~60% backfill allocation; reduced cadence 1 session/run). Source `2eiseikanrisha.kakomonn.com` responded normally; the 協会 archive page (exam.or.jp/lckohyo) currently lists only the last two upload batches, so the 令和7年4月公表 PDF was located in the 2025/04 upload folder as LC20251115.pdf (第二種衛生管理者免許試験, ○-marked answers). Bing signals from 2026-08-27 (衛生管理者 37k / 第二種衛生管理者 4.6k / 過去問・解説付き clusters) continue to support growing the daini archive.
- Traffic lever: coverage (official-archive completeness; 31 new indexable URLs under the existing all-official-pages-indexable policy).
- Changed URLs: `/exams/daini-eisei-kanrisha/questions/official-57022-q01/`…`q30/` (new, 30 pages), `/exams/daini-eisei-kanrisha/questions/session/57022/` (new session page); `/exams/daini-eisei-kanrisha/` hub copy now lists all 3 sessions; home/exams/questions-index counts auto-updated (3資格・333問); sitemap 324 → 355 URLs.
- Verification: structural validation (30/batch, numbering 1–30, 5 choices, answer range 0–4, distribution 10/10/10, no intra-session duplicates); official-PDF cross-check 30/30 (LC20251115) with zero mismatches; prompts spot-checked against the PDF (content matches; only full-width/half-width paren differences); `npm run build` (0 errors), `git diff --check` clean; local preview: sitemap 355 (3 daini sessions), session/57022 + 30 question pages 200 with one H1, `index,follow`, gokakudo.com canonical; mobile 375px + desktop 1280px render checks on 6 routes with no horizontal overflow and no console errors.
- Deployment: `npm run deploy`; Worker version recorded after production verification below.
- Expected observation window: 14–28 days; watch GSC once available for the daini hub, session pages, and the 90 indexable daini question pages (30 new URLs this run), plus `解説付き` clusters from Bing signals.
- Follow-up result: pending. Next-run candidates: (1) daini backfill 57021 (1 session/run), (2) extend verified explanations to 57023/57022 sessions (or 第一種 20054) as capacity allows, (3) build the 受験ガイド informational cluster (日程・受験資格・合格率・1種2種の違い) only with a verified data table and internal links, (4) next weekly new-qualification launch assessment from the candidate list (電気工事士2種 44.7k / 損害保険募集人 22.5k / 電験三種 20.2k Bing impressions), (5) revisit GSC/GA4/Bing-site credentials to start the first 28-day baseline.

### YYYY-MM-DD

- Data cutoff:
- GSC 28-day clicks / previous period:
- Supporting signals:
- Opportunity and evidence:
- Traffic lever: coverage / ranking / CTR
- Changed URLs:
- Verification:
- Deployment version:
- Expected observation window:
- Follow-up result:

### 2026-08-26

- Data cutoff: 2026-08-26 (first autonomous run; no prior period exists).
- GSC 28-day clicks / previous period: baseline not yet measurable. GSC/GA4 MCP is not exposed in this environment and no local GSC/GA4 credentials were found; recorded as a data-source gap, not site evidence. First baseline will be established from the next run that can reach GSC.
- Supporting signals:
  - Bing Webmaster: `GetRankAndTrafficStats`/`GetQueryStats` for gokakudo-eisei.rusher-xie.workers.dev returned `NotAuthorized` (site not verified under the stored Bing key, which is registered for numpredo.com). Bing keyword research API worked: 104 related keywords for the two qualifications (top impressions: 危険物取扱者試験 乙4 50,019; 衛生管理者 37,133; 第一種衛生管理者 23,896; 危険物取扱者試験 19,972; 危険物取扱者試験 乙4 過去問 14,778; 衛生管理者試験日程 10,721; 衛生管理者 過去問 8,972; 第一種衛生管理者 過去問 5,504).
  - Live site: home, sitemap, and robots all HTTP 200; production healthy.
- Opportunity and evidence: Official-question archive completeness is the long-term constraint and the 60% weekly allocation. The kakomonn.com pipeline was already validated (44 questions/session, answer fetch, distribution checks). This run backfilled 4 additional sessions (220 usable official questions across 5 sessions) and cross-checked answers 44/44 against official 安全衛生技術試験協会 PDFs for the two newest sessions. Bing keyword research confirms the archive directly serves high-impression queries (衛生管理者 過去問, 第一種衛生管理者 過去問). A mid-run source rate limit (HTTP 429) cooled down and the importer finished 2 more sessions at gentler pacing; `令和5年10月公表` (20049) was rejected by validation because kakomonn uses an older page format there (42 links, different title layout) – recorded as a format-adaptation task for the next run.
- Traffic lever: coverage (official archive completeness; practice product depth). No index expansion this run: GSC evidence is unavailable and official single-question/session pages stay `noindex` per the conservative rollout path.
- Changed URLs (all server-rendered, no sitemap change):
  - `/exams/eisei-kanrisha/` – dynamic question counts; hero links reflect 155 questions.
  - `/exams/eisei-kanrisha/questions/` – archive-aware copy/description (3 sessions so far) and cross-check note.
  - `/exams/eisei-kanrisha/questions/session/{20054|20053|20052}/` – per-session subject distribution table and source note.
  - `/exams/kikenbutsu-otsu4/questions/` – dynamic counts.
  - `/` and `/exams/` – counts now derived from data (`src/data/exams.ts`).
- Verification: aggregate validation (44/batch, numbering, choices, answer range, distribution, no intra-session duplicates); official-PDF cross-check 44/44 for two sessions; `npm run build`; `git diff --check`; mobile/desktop render check.
- Deployment version: `950431e` → `npm run deploy`; Cloudflare Worker version `da20e2fe-5bb7-4b80-adc2-277ebf65efd2`. Production verified: home/hub/questions/session/single-question routes all HTTP 200; canonical, robots, sitemap (`lastmod 2026-08-26`) correct; session and official single-question pages carry `noindex,follow`; prediction pages remain indexable; CSP now permits GA4 beacon endpoints.
- Expected observation window: 14–28 days; check GSC indexing and impressions for `/exams/eisei-kanrisha/`, `/exams/eisei-kanrisha/questions/`, and the questions index once GSC access is available.
- Follow-up result: pending. Candidates for next runs: (1) adapt the importer to kakomonn's older format for 20049 and earlier sessions (and cross-check against official PDFs where available), (2) resume backfill at gentler pacing (max 2–3 sessions/run), (3) establish GSC 28-day baseline once GSC access exists, (4) 危険物乙4 過去問 remains constrained by the site's published copyright policy (official questions not reproduced; keep original prediction questions), (5) promote session pages to index only after GSC evidence supports a wave.
