import { createContentLoader } from 'vitepress'

export default createContentLoader('*.md', {
  includeSrc: true,
  transform(pages) {
    return pages
      .filter(page => !['/', '/README.html', '/index.html'].includes(page.url)
        && page.src?.trim() && page.src.trim() !== 'null')
      .map(page => ({
        url: page.url,
        title: page.frontmatter.title || decodeURIComponent(page.url.split('/').pop()!)
          .replace(/\.html$/, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
      }))
      .sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
  }
})
