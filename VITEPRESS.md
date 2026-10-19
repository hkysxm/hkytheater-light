# VitePress 开发与部署

项目使用 VitePress 默认主题。原有 Markdown 和 README 内容保留，首页由 `docs/index.md` 和内容加载器自动展示文章列表。

使用 Node.js 22 或 24：

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

Cloudflare Pages 设置：

- 根目录：仓库根目录（留空）
- 构建命令：`npm run build`
- 输出目录：`dist`（相对于仓库根目录）

旧命令 `npm run docs:dev` 和 `npm run docs:build` 保留为别名。

在 `docs` 新增 Markdown 文件后，首页会在构建时自动收录。README、首页及空占位文件不计入文章列表。原文章继续使用同名 `.html` 路径，README 使用 `/README.html`。

此次迁移使用 VitePress 默认主题和 Markdown 渲染，没有迁移 VuePress 的自定义短代码和样式；原文中的 `[scode]`、`[collapse]`、`[post]` 会保持文本形式。原有 `/img/` 图片指向 `https://hky.moe/img/`，可用性取决于原站。

根目录 README 保留原文，因此其中先前的 VuePress 开发说明已过时，请以本文件为准。`node_modules` 不再纳入版本控制，由 `npm ci` 按锁文件安装。

为保留旧文章原文件，渲染兼容层会修正引用代码块中缺少 `>` 的续行、HTML 表格结构、正文中的 `<head>` 字样和多余括号的外部链接；VitePress 的站内死链检查仍然开启。
