---
home: true
---
# hkytheater-light
### hky.moe ( light version)

 - The light version of <https://hky.moe>
 - fast, light
 - Transfer article by Auto Script
 - Powered by VuePress, Cloudflare pages
 - Articles will be 7 ~ 30 days later than hky.moe

## 本地开发与 Cloudflare Pages

- Node.js：建议使用 22 或 24。构建脚本会自动处理 VuePress 1 / Webpack 4 在新版 Node.js 下的 OpenSSL 兼容参数。
- 安装依赖：`npm ci`
- 本地开发：`npm run docs:dev`
- 静态构建：`npm run docs:build`
- 回归检查：`node --test tests/*.test.js`

Cloudflare Pages 使用项目根目录，构建命令设置为 `npm run docs:build`，构建输出目录设置为 `docs/.vuepress/dist`。部署这个输出目录，不要把仓库根目录或 `docs` 源文件目录作为输出目录。站点位于 `hky.pages.dev` 的根路径，因此 VuePress 的 `base` 保持 `/`。

首页由 `docs/.vuepress/theme/components/Home.vue` 自动列出 `docs` 下的 Markdown 文章，优先使用 frontmatter 的 `title`，否则使用文件名。首页 README、空文件及内容仅为 `null` 的占位文件不列入文章列表；它们不会被删除。增加文章后重新构建即可更新首页。

原博客的提示框、折叠内容及文章引用由 Markdown 扩展处理，文章源文件保持原样。原文中的 `/img/` 图片使用 `https://hky.moe/img/`，图片能否加载仍取决于原站资源是否可用。

仓库历史上跟踪了 `node_modules`；本次修复未移除这些文件。云环境中为避免安装时改写已跟踪依赖，可以继续使用环境设置中保存的仓库外安装流程。
