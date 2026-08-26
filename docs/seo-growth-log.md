# SEO Growth Log

North star: Google Search Console organic clicks over complete rolling 28-day windows.

## Baseline

- Site: https://gokakudo-eisei.rusher-xie.workers.dev/
- Market: Japan
- Language: Japanese
- Topic: qualification examinations and practice questions
- Baseline status: establish from the first complete GSC data pull; compare the latest complete 28 days with the preceding 28 days.

## Run Template

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
- Deployment version: `npm run deploy` (wrangler) after checks; verified production home and affected routes.
- Expected observation window: 14–28 days; check GSC indexing and impressions for `/exams/eisei-kanrisha/`, `/exams/eisei-kanrisha/questions/`, and the questions index once GSC access is available.
- Follow-up result: pending. Candidates for next runs: (1) adapt the importer to kakomonn's older format for 20049 and earlier sessions (and cross-check against official PDFs where available), (2) resume backfill at gentler pacing (max 2–3 sessions/run), (3) establish GSC 28-day baseline once GSC access exists, (4) 危険物乙4 過去問 remains constrained by the site's published copyright policy (official questions not reproduced; keep original prediction questions), (5) promote session pages to index only after GSC evidence supports a wave.
