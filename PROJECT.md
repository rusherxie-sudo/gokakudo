# gokakudo（合格道）

> 日本资格考试学习站（卫生管理者、危险物乙4 等）。

## 核心信息
- **域名**：https://gokakudo.com
- **用途**：资格考试刷题学习（真题 + 原创预测题），练习/复习/进度
- **北极星**：GSC 28 天滚动自然点击（+ 展示/排名/CTR/收录辅助指标）
- **目标用户**：日本考证人群
- **站点语言**：日语
- **GitHub**：`rusherxie-sudo/gokakudo`（main，public）

## 技术栈
- Astro 7 + `@astrojs/cloudflare`（SSR，output server）+ TypeScript + cheerio（抓取）+ `@astrojs/check`
- 包管理器：npm
- 题目数据：静态 TS/JSON（`src/data/questions.ts`、`imported/official-questions.json` 等），打进 bundle

## 部署
- Cloudflare Workers（SSR，wrangler），通过 Cloudflare Workers Builds 连接 GitHub 自动部署（推 main 触发，见 `docs/github-cloudflare-deploy.md`）

## 数据依赖
- 无 D1/KV；题目静态 JSON；学习进度用 localStorage（**待确认**）

## 页面类型
- `exams/<考试>/questions/[id]`（单题页）、`exams/.../session/[batch]`（套题）、`practice`、`review`、`progress`、`trust/[slug]`
- 考试：第一種衛生管理者、危険物取扱者 乙種4類、第二種衛生管理者

## SEO 结构
- sitemap.xml、robots.txt、`llms.txt`
- 索引门控（rollout gates）：单题页按证据逐步开放索引（`docs/question-coverage.md` 追踪）

## 权威文档
- `AGENTS.md`（North Star / Data Priority / Content Expansion / rollout gates，最全）
- `docs/question-coverage.md`（题目覆盖库存，每次导入更新）、`docs/seo-growth-log.md`、`docs/github-cloudflare-deploy.md`

## 最近方向
- 官方真题 backfill（第一種衛生管理者 20.8% 覆盖、第二種 15.8%）；新考试研发（每周 1 个目标）；2026-09-05 切 Cloudflare Workers Builds 自动部署

## GA4
- 测量 ID `G-0PSMT5NP01`（媒体资源 551320290，已确认指向 gokakudo.com，非 numpredo）
