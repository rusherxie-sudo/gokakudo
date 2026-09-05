# GitHub → Cloudflare 部署

本项目使用 Cloudflare Workers Builds 连接 GitHub。向 `main` 分支推送后，由 Cloudflare 自动构建并部署到 Cloudflare Workers。

## Cloudflare 一次性配置

1. 打开 Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Workers**。
2. 选择 **Import a repository**，授权 GitHub，并选择 `rusherxie-sudo/gokakudo`。
3. 生产分支选择 `main`，项目根目录保持仓库根目录。
4. 构建命令填写 `npm run build`。
5. 部署命令填写 `npx wrangler deploy`。
6. 确认 Worker 名称为 `gokakudo-eisei`，与 `wrangler.jsonc` 中的 `name` 一致。
7. 点击部署。之后每次推送到 `main` 都会自动部署。

Cloudflare 会通过 GitHub OAuth 访问仓库，不需要创建或保存 Cloudflare API Token 到 GitHub Secrets。

## 本地验证

```sh
npm ci
npm run build
```

本地仍可使用 `npm run deploy`，但生产发布统一通过 Cloudflare Workers Builds。
