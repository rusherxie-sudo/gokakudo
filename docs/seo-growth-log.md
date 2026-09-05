# SEO Growth Log

North star: Google Search Console organic clicks over complete rolling 28-day windows.

## Baseline

- Site: https://gokakudo-eisei.rusher-xie.workers.dev/
- Market: Japan
- Language: Japanese
- Topic: qualification examinations and practice questions
- Baseline status: establish from the first complete GSC data pull; compare the latest complete 28 days with the preceding 28 days.

### 2026-09-05（SEO 元数据刷新 + 第二種发现加速）

- 数据截止：GSC/GA4/Bing 滚动数据至 2026-09-04；线上 sitemap/robots/URL Inspection 抽查 2026-09-05。
- GSC 28 天点击/前一周期：10 点击/448 展示/CTR 2.23%/均排 10.8（前一 28 天 0/0；站点 2026-08-22 起才有数据）。全部流量来自第一種页。数据源缺口已解决：GA4 测量 ID `G-0PSMT5NP01` 已确认指向 gokakudo.com 独立属性（551320290），30 天 Organic Search 14 会话/12 用户；Bing 本站 API 已验证可读（InIndex 仅 2 页、10 天 0 点击/0 展示）。
- 页面级证据：第一種 220 题页基本已收录出排名；已增强的 11 页中 q14(2/14/5.6)、q22(2/48/10.6)、q35(1/7/6.6) 有点击，另 8 页(q09/q15/q25/q34/q39/q40/q41/q43)位于第 1 页 6-10 位但 0 点击；第二種 90 题页+3 会话页对 Google 仍是「URL unknown to Google」；第二種 hub 0/17/位置 44.5；危险物乙4 hub 0/12/位置 39.8，题页排名 84-105 未起色。
- 机会与选择（本轮为 manager 综合 seo/ops 独立评估后的取舍，未沿用旧基线）：(1) 元数据/文案补齐第二種、强化「過去問・解説付き」头部词——首页/资格列表/第一種 hub/题列表的 title+description，并修正「無料予想問題」「詳細解説は確認中」等过时文案；(2) 刷新 sitemap lastmod 至 2026-09-05 触发重抓，加速 95 个未发现第二種 URL 的收录；(3) 派发 seo 后续任务做 GSC/Bing 索引提交。暂缓：在 meta 暴露正答的 CTR 实验（风险/策略未定）、第二種 57023/57022 解说回填（页面尚未收录，先收录再解说）、sem-3ue（周六不在周计划内）。
- 改动 URL：全站（title/description 元数据）；`/`、`/exams/`、`/exams/eisei-kanrisha/`、`/exams/eisei-kanrisha/questions/`；`/trust/about/`（运营信息文案）；`/llms.txt`；sitemap 355 条 lastmod 全部 2026-09-05。索引 URL 总数不变（355）。
- 影响杠杆：排名+CTR（头部词「衛生管理者 過去問」「第一種衛生管理者 過去問」相关性 + 「解説付き」信号）+ 覆盖（第二種收录加速）。
- 验证：`npm run build` 0 errors/0 warnings；`git diff --check` 通过；本地 wrangler dev 逐页核对 title/description/lastmod；桌面 1280px + 移动 375px 共 8 路由无横向溢出、答题交互正常、无控制台错误。
- 部署：`fcb6d28` → 推 main → Cloudflare Workers Builds 自动部署成功（check-run success，2026-09-05T16:04Z）。生产复检：首页/资格列表/第一種 hub/题列表 title+description 正确，题列表「根拠つき解説あり」=11，sitemap 355 条 lastmod 2026-09-05，关键路由全 200。
- 预期观察窗口：14–28 天。重点比较 8 个第 1 页零点击第一種页的 CTR、第一種 hub 的「過去問」词展示/排名、第二種 URL 是否开始被抓取收录。
- 后续候选：(1) 复核 CTR 与头部词效果后决定是否扩大第一種 20054 解说覆盖；(2) 第二種收录后回填 57023/57022 解说；(3) 建受験ガイド信息集群；(4) 每周新资格考试评估；(5) host-admin 核对 CF dashboard WAF/日志告警。

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
- Deployment: `50d4ca9` → `npm run deploy` (Worker `b005aecb-67fc-4096-85ec-0eac1c7c0aee`), then `593eb88` → `npm run deploy` (Worker `67ca1edb-36a3-4d44-901e-6df5423afb17`) to refresh sitemap `lastmod` to 2026-08-28. Production verified: home 3資格・333問 200; sitemap 355 URLs (3 daini session URLs, lastmod 2026-08-28); session/57022 + official-57022-q01/q15/q30 all 200 with `index,follow`, gokakudo.com canonical, one H1; old hub/57024 pages and robots intact; workers.dev 301 → gokakudo.com same path intact.
- Indexing submission: skipped this run — no GSC/Chrome tooling and no gokakudo IndexNow key exist in this environment (recorded gap since 2026-08-26); 30 new URLs are in the sitemap for organic discovery.
- Expected observation window: 14–28 days; watch GSC once available for the daini hub, session pages, and the 90 indexable daini question pages (30 new URLs this run), plus `解説付き` clusters from Bing signals.
- Follow-up result: pending. Next-run candidates: (1) daini backfill 57021 (1 session/run), (2) extend verified explanations to 57023/57022 sessions (or 第一種 20054) as capacity allows, (3) build the 受験ガイド informational cluster (日程・受験資格・合格率・1種2種の違い) only with a verified data table and internal links, (4) next weekly new-qualification launch assessment from the candidate list (電気工事士2種 44.7k / 損害保険募集人 22.5k / 電験三種 20.2k Bing impressions), (5) revisit GSC/GA4/Bing-site credentials to start the first 28-day baseline.

### 2026-08-29（GSC 快赢页：第一種 7 问根拠解说）

- 数据截止：GSC 更新至 2026-08-26。`sc-domain:gokakudo.com` 已可访问，网页索引报告仍显示“正在处理数据，请过 1 天左右再来查看”，因此本轮不把 URL Inspection 抽样冒充全站收录率。
- 北极星基线：最近 28 天（实际仅 2026-08-22～2026-08-26 有数据）2 点击、117 展示、CTR 1.7%、平均排名 8；前一 28 天为 0 点击/0 展示。阶段目标确定为 2026-10-31 前滚动 28 天达到 100 GSC 点击。当前可见查询 8 个，其中 6 个平均排名在 Top 10，但样本仍很小。
- 历史改动复盘：第一種最新期次单题页已产生首批 Google 展示和点击，证明公表题页能够承接逐字题干与资格词需求；第二種新增档案尚未进入 GSC 可见页面/查询明细，继续扩索引的收益暂时没有真实数据支持。
- GSC 页面证据（点击/展示/平均排名）：`20054-q22` 1/10/14.4，`q25` 0/11/7.1，`q39` 0/11/10.6，`q41` 0/10/7.8，`q14` 0/8/7.0，`q40` 0/8/8.8，`q34` 0/8/11.5。`q22` 对应的逐字题干查询已有 1 点击、3 展示、平均排名 11。
- 辅助证据：Bing 本站 API 已能读取 `https://gokakudo.com`，但仅有 2026-08-25～26 两天且累计 0 点击/0 展示，query/page 细分仍为空。Bing 关键词研究（JP/ja-JP，近 3 个月）显示 `衛生管理者 過去問` 8,290、`第一種衛生管理者 過去問` 5,214 展示，继续支持“免费过往问+解说”主题。SEMrush 本轮未运行：今天是周六，不在每周三的扩词/Keyword Gap 计划内。
- GA4 缺口：代码中的测量 ID `G-0PSMT5NP01` 在当前账号打开名为 `numpredo.com` 的媒体资源；“网页和屏幕”报告筛选 `/exams/` 返回无数据。未将该资源的 1,088 活跃用户冒充合格堂指标，也未在缺少独立媒体资源时修改测量配置。
- 机会与选择：按覆盖×排名×CTR排序，已有展示且排名 7～14 的 7 个第一種单题页是本轮最高 ROI；暂停新增索引页，优先把占位解说升级为有独立价值的根拠解说，并强化搜索摘要中的“過去問・解説”意图。
- 改动 URL：`/exams/eisei-kanrisha/questions/official-20054-q{14|22|25|34|39|40|41}/`。新增独立撰写的全选项解说，分别引用厚生労働省、e-Gov 或已完成 44/44 正答核验的安全卫生技术试验协会公表 PDF；新增“解説の根拠”来源框、`根拠つき解説` 可见标识，并为这 7 页使用更明确的 title/description。其他 213 个第一種公表题页保持不变。
- 影响杠杆：排名（增加可验证、非占位的独特解释）+ CTR（title/description 明确传达过往问与解说价值）。索引 URL 总数不变，sitemap 仍为 355。
- 验证：7 个解说来源均 HTTP 200；目标题答案范围、5 选项和题号校验通过；`npm run build` 0 errors/0 warnings；`git diff --check` 通过。移动端 375×812 与桌面端 1280×900 共检查 18 个路由，无横向溢出、元素重叠或控制台错误；7 个目标页均为 200、唯一 H1、`index,follow`、`gokakudo.com` canonical、有效 JSON-LD、2 个来源链接；历史第一種页与第二種页未回归。sitemap 355 URL，robots 指向生产 sitemap。
- 部署：`3c6c883` → `npm run deploy`；Cloudflare Worker 版本 `74de0fd2-17ad-475e-bcac-bffafa1952bb`。生产抽查 7 个目标页、首页、历史第一種题页和第二種题页均 200；目标页 title/description、唯一 H1、canonical、`index,follow`、JSON-LD、2 个来源链接和移动端答题交互正常；sitemap 355 URL（`lastmod` 2026-08-29），robots 正常，workers.dev 同路径 301 到 `gokakudo.com`。
- 收录提交：GSC URL Inspection 确认 `q22`、`q14`、`q25` 均“网页已编入索引”。`q22` 的重大更新重抓已明确显示“已请求编入索引”；`q14` 提交后的最终提示未能可靠识别，不重复提交；提交 `q25` 时明确提示“超出了配额”，因此 `q25` 未提交，`q34/q39/q40/q41` 未尝试，留到次日额度。请求重抓只加速发现新内容，不保证收录、排名或流量。
- 预期观察窗口：14～28 天。重点比较 7 页的展示、平均排名和 CTR；在 GSC 网页索引报告完成前不扩大单题索引波次。
- 后续候选：先复查本轮 7 页和第二種档案的 GSC 信号；若索引质量健康，再恢复第二種 `57021` 单期次回填。GA4 需要建立或确认合格堂独立媒体资源后才能形成有效 Organic Search 会话基线。

### 2026-08-31（GSC 快赢页：第一種新增 4 问根拠解说）

- 数据截止：GSC 更新至 2026-08-28。最近 28 天实际仅 2026-08-22～28 有数据：5 点击、217 展示、CTR 2.3%、平均排名 9；前一 28 天为 0 点击/0 展示。相较 8 月 29 日运行时的数据截止（2 点击、117 展示），累计增加 3 点击和 100 展示；2026-10-31 前滚动 28 天达到 100 点击的阶段目标不变。
- 历史改动复盘：8 月 29 日增强的 7 页发生在本次 GSC 数据截止之后，尚不能评价 CTR/排名效果；不把截止日前的增长归因于该改动。网页索引报告仍显示“正在处理数据”，因此继续暂停新增索引页和第二種档案回填。
- GSC 页面证据（点击/展示/CTR/平均排名）：`q14` 2/14/14.3%/5.6，`q22` 1/15/6.7%/13.2，`q35` 1/7/14.3%/6.6，`q15` 0/14/0%/9.1，`q09` 0/13/0%/9.4，`q43` 0/11/0%/8.0。`q15`、`q09`、`q43` 是尚未增强且排名 8～10 的新增零点击快赢页；`q35` 已产生点击，适合巩固有效模式。
- 辅助证据：Bing 本站 API 截至 2026-08-27 共 3 天仍为 0 点击/0 展示，query/page 细分为空；近 3 个月 JP/ja-JP 关键词显示 `衛生管理者 過去問` 8,290、`第一種衛生管理者 過去問` 5,214、`第二種衛生管理者 過去問` 938 展示。GA4 当前账号的媒体资源列表仍没有合格堂独立资源，未引用其他站点流量。SEMrush 未运行：今天是周一，不在每周三的 Keyword Gap/竞品研究计划内；全程未访问官网。
- 机会与改动：选择 `/exams/eisei-kanrisha/questions/official-20054-q{09|15|35|43}/`，以安全卫生技术试验协会公表 PDF `LC20260415-1` 逐页核对题干、五个选项和正答标记后，新增独立全选项解说、`解説の根拠`、`根拠つき解説` 标识，以及自动启用的“過去問 問X 解説”title/根拠型 description。影响杠杆为排名（去除占位解说、增加独特可验证信息）和 CTR（摘要明确“過去問・解説”）；索引 URL 数不变。
- 验证：公表 PDF 23 页完整读取并对 q09/q15/q35/q43 的原始版面复核；站内答案分别为 1/5/4/5，均为 5 选项且与 PDF 圆圈答案一致；官方来源 HTTP 200。`npm run build` 多次通过（Astro 0 errors/0 warnings），`git diff --check` 通过。375×812 和 1280×900 下 4 页均无横向溢出或控制台错误，答题后解说/来源正常显示；唯一 H1、canonical、index robots、description 和 JSON-LD 均有效。
- 提交与部署：`e406a8c`（4 页解说与逐条验证日期）、`44202fb`（sitemap `lastmod` 2026-08-31）；最终 Cloudflare Worker 版本 `db39ad41-97eb-4013-a885-983ad5bd7b34`。生产 4 页均 200 且元数据/根拠区块正确；旧 q14、第二種 Hub 正常；sitemap 355 URL 且全部 lastmod 为 2026-08-31；robots 正常；workers.dev 同路径 301 到 `gokakudo.com`。
- 收录提交：URL Inspection 确认 q09/q15/q35/q43 均“网址已收录到 Google”。q09、q15 的重大更新已成功加入优先抓取队列；q35、q43 各尝试一次后 GSC 返回“请稍后重试”，本轮未重复提交。请求重抓只加速重新发现，不保证收录、排名或点击。
- 预期观察窗口：14～28 天。优先比较这 4 页和 8 月 29 日 7 页的展示、CTR、平均排名；索引报告完成且质量健康后，再决定是否恢复第二種 `57021` 单期次回填。若继续做内容快赢，候选为已有展示但仍为占位解说的 `q04`、`q31`、`q37`，仍须以更新后的 GSC 排序复核。

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
