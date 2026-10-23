import { fileURLToPath } from 'node:url'
import { createContentLoader } from 'vitepress'
import { articleTitle, isArticle } from './theme/utils/title.mts'
import { ensureFullGitHistory, firstCommitTime, newestArticleFirst } from './git-history.mjs'

const sourceDir = fileURLToPath(new URL('../', import.meta.url))

export default createContentLoader('*.md', {
  includeSrc: true,
  transform(pages) {
    ensureFullGitHistory(sourceDir)
    return pages
      .filter(page => isArticle(page.url, page.src || '', page.frontmatter))
      .map(page => ({
        url: page.url,
        title: articleTitle(page.url, page.frontmatter),
        firstCommittedAt: firstCommitTime(sourceDir, decodeURIComponent(page.url.slice(1)).replace(/\.html$/, '.md'))
      }))
      .sort(newestArticleFirst)
  }
})
