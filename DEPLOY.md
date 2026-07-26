# 部署到 Cloudflare Pages（静态导出）

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
1. Dashboard → 你的 Pages 项目 → **Settings → Build & deployments → Build configuration**（或在首次创建项目时）。
2. **Framework preset（框架预设）：选 `None`（或 “Other”）**。这一步最关键，它会阻止 Cloudflare 注入 opennext 构建流程。
3. **Build command（构建命令）：`npm run build`**
4. **Output directory（输出目录）：`out`**（注意不是默认的 `.next`）
5. **Node.js version：22**（与本地一致；`package.json` 的 engines 要求 `>=20.9.0`）
6. 保存，然后到 **Deployments**，对最近一次失败构建点击 **Retry deployment**，并在弹窗中选择 **Clear cache and retry（清除缓存并重试）**。

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
