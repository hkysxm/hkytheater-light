module.exports = page => {
  if (page.path === '/') {
    page.frontmatter.home = true
    page.title = '文章列表'
    return
  }
  const source = (page._strippedContent || '').trim()
  if (!page.relativePath || !page.relativePath.endsWith('.md') || !source || source === 'null') return
  const filename = page.relativePath.split('/').pop().replace(/\.md$/, '')
  page.articleTitle = page.frontmatter.title || filename.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
}
