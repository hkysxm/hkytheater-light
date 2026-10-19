import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import archiveMarkdown from './archive-markdown.mjs'

export default defineConfig({
  title: 'hkytheater-light',
  description: 'hky.moe 的轻量版',
  lang: 'zh-CN',
  outDir: fileURLToPath(new URL('../../dist', import.meta.url)),
  themeConfig: {
    nav: [{ text: '文章', link: '/#文章列表' }]
  },
  markdown: {
    config(md) {
      md.use(archiveMarkdown)
    }
  }
})
