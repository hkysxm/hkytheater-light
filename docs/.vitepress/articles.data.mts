import { createContentLoader } from 'vitepress'
import { articleTitle, isArticle } from './theme/utils/title.mts'

export default createContentLoader('*.md', {
  includeSrc: true,
  transform(pages) {
    return pages
      .filter(page => isArticle(page.url, page.src || '', page.frontmatter))
      .map(page => ({
        url: page.url,
        title: articleTitle(page.url, page.frontmatter)
      }))
      .sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
  }
})
