import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import archiveMarkdown from './archive-markdown.mjs'
import { articlePageData } from './article-page.mts'

export default defineConfig({
  title: 'hkytheater-light',
  description: '[hky.moe](https://hky.moe) 的轻量版，文章按首次 Git 提交时间倒序归档',
  lang: 'zh-CN',
  appearance: true,
  head: [
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#1b1b1f', media: '(prefers-color-scheme: dark)' }]
  ],
  outDir: fileURLToPath(new URL('../../dist', import.meta.url)),
  themeConfig: {
    nav: [{ text: '文章', link: '/#文章列表' }]
  },
  transformPageData(pageData, { siteConfig }) {
    return articlePageData(pageData, readFileSync(resolve(siteConfig.srcDir, pageData.relativePath), 'utf8'))
  },
  markdown: {
    config(md) {
      md.use(archiveMarkdown)
    }
  }
})
