# 部署到 Cloudflare Pages（静态导出）

> ⚠️ **先看项目类型：必须是 Cloudflare Pages，不是 Cloudflare Workers**
> 
> 本仓库是 **Next.js 静态导出站点**，必须部署到 **Cloudflare Pages**（静态托管服务）。
> 
> 如果你在 Cloudflare 控制台看到以下字段，说明创建成了 **Workers 项目**：
> - 构建命令
> - 部署命令
> - 版本命令
> - 根目录
> 
> Workers 是给服务端 Worker 脚本用的，它的 `npx wrangler deploy` 流水线不会读取 `out/` 静态目录，
> 因此会永远报 `ENOENT ... pages-manifest.json` 等错误。**请删除该 Workers 项目，重新在 Cloudflare Pages 里创建项目。**
> 
> 正确入口：**Dashboard → 左侧菜单 → Workers & Pages → 顶部选择 Pages → Create a project → Connect to Git**。
> 不要选 Workers / "Create a Worker"。

## 构建模式
本项目使用 Next.js **静态导出**（`next.config.ts` 中 `output: 'export'`）。所有页面在构建时预渲染为 `out/` 目录下的纯静态 HTML / JS / CSS。HEIC 解码完全在浏览器端（WASM）完成，**不需要任何服务端或边缘函数**。

## ⚠️ 不要用 Cloudflare 的 “Next.js” 预设
Cloudflare Pages 的 GitHub 自动部署会把 Next.js 项目识别为 “Next.js” 预设。该预设走 `@opennextjs/cloudflare` **服务端运行时**，会执行 `npx opennextjs-cloudflare build` 并期望找到 `.next/standalone/.next/server/pages-manifest.json`。

本项目的静态导出**不产生 standalone 服务端**，因此会报：

```
Error: ENOENT: no such file or directory, open
'/opt/buildhome/repo/.next/standalone/.next/server/pages-manifest.json'
```

> 网上常见“把 `output` 改成 `standalone`”的建议是针对**服务端部署**的，与本项目刻意的静态导出架构冲突，**请勿采用**——这会导致整个静态导出/客户端解码架构需要返工。

## Cloudflare Pages 控制台设置（GitHub 自动部署）

> 关键陷阱：把 Framework preset 改成 `None` 后，**Build command 输入框会变成可编辑，但不会自动清空**——
> 它往往仍残留 `npx opennextjs-cloudflare build`。必须**手动把 Build command 改成 `npm run build`**，否则还会报
> `pages-manifest.json` 的 ENOENT。Output directory 同理要改成 `out`。

1. Dashboard → 你的 Pages 项目 → **Settings → Build & deployments → Build configuration**。
2. **Framework preset：选 `None`（或 “Other”）**。这一步阻止 Cloudflare 注入 opennext 流程。
3. **Build command：手动清空并填入 `npm run build`**（务必确认不是 `npx opennextjs-cloudflare build`）。
4. **Output directory：改成 `out`**（不是默认的 `.next`）。
5. **Node.js version：22**（与本地一致；`package.json` 的 engines 要求 `>=20.9.0`）。
6. 保存 → **Deployments** → 对失败构建点 **Retry deployment** → 选 **Clear cache and retry**。

> ✅ **线上安全提示**：Cloudflare Pages 只有**成功的构建**才会成为新的生产部署；失败的构建**不会**替换线上版本。
> 所以你改设置、点 retry、甚至多次失败，线上站点都始终由旧的可用部署在服务，不会下线。只有新构建成功那一刻才会切换。
> 改设置本身也不需要删除/重建项目。

### 如果改完上述设置仍然报同一个 ENOENT
说明该项目最初是用 “Next.js” 预设创建的，opennext 构建流水线被固化、仅靠改设置可能无法取消。按“对线上影响从低到高”选：

**首选：在现有项目里直接改设置（零影响线上，推荐）**
- 直接走上面 6 步：把 Framework preset 改成 `None`、Build command 手动改成 `npm run build`、Output directory 改成 `out`，再 Clear cache & retry。
- 如上「线上安全提示」所述，失败的构建不会下线线上，可放心反复 retry 直到成功。
- 多数情况下，把 Build command 残留的 `npx opennextjs-cloudflare build` 手动改成 `npm run build` 即可解决。

**零停机：新建第二个 Pages 项目并行切换（适合已绑定自定义域名）**
- 保留当前线上项目**不动**。新建一个 Pages 项目 → 连接同一 Git 仓库 → “Set up builds” 直接选 `None` → `npm run build` + 输出 `out`。
- 新项目部署成功后用它的 `*.pages.dev` 临时地址自行验证。
- 确认无误后，把自定义域名从旧项目切到新项目（Cloudflare 自定义域名可在项目间迁移；切换瞬间短暂停顿，旧项目一直在线直到切换完成）。
- 完全确认新项目 OK，再删除旧项目。全程线上零中断。

**最后兜底：重建 Pages 项目（⚠️ 会影响线上，谨慎）**
- 仅当上述都不行、且你能接受短暂停机时：删除当前项目（Settings → Delete project）后重新创建并选 `None` 预设。
- ⚠️ 这会删除线上项目与部署历史，删除期间站点不可用；若绑定了自定义域名需重新接入。**非必要不采用**。

**B. 改用 Wrangler 直接上传（绕过 GitHub 构建流水线，100% 静态）**
- 保留现有项目，本地构建后直接上传 `out/` 到该项目（产物内容一致，线上页面不变，不影响项目本身存在）：
  ```bash
  npm run build
  npx wrangler pages deploy out
  ```
- 完全不经过 opennext，最稳妥，适合 CI / 手动发布。

## Sitemap / robots 说明
- `npm run build` 在 `next build` 之后会执行 `scripts/generate-sitemap.mjs`，自动生成 `out/sitemap.xml` 与 `out/robots.txt`。
- sitemap 的站点域名来自环境变量 **`SITE_URL`**（默认 `https://heic-converter.pages.dev`）。
  在 Cloudflare **Settings → Build & deployments → Environment variables** 中加入 `SITE_URL=https://你的真实域名`，
  让 sitemap 里的链接指向正式域名。

## 构建产物校验
`npm run build` 后，`out/` 应包含：

- 根目录：`index.html`、`404.html`、`favicon.ico`、`_next/`
- 语言目录：`de/`、`ja/`、`zh/`，各含 `index.html`
- 指南目录：`doc/what-is-heic/`、`doc/heic-vs-jpeg/`、`doc/open-heic-on-windows/`，各含 `index.html`

这些就是 Cloudflare Pages 要托管的全部静态文件，没有额外运行时依赖。

## 本地预览构建产物（可选）
```bash
npx serve out
# 或任意静态文件服务器
```

## 备选：用 Wrangler 直接上传（不走 GitHub 自动部署）
若不想依赖控制台的框架预设识别，可改用直接上传，构建命令与产物目录完全由本地决定：

```bash
npm run build
npx wrangler pages deploy out
```
