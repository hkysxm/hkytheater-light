import { articleTitle, isArticle } from './theme/utils/title.mts'

interface ArticlePage {
  relativePath: string
  frontmatter: Record<string, unknown>
}

export function articlePageData(page: ArticlePage, source: string) {
  const content = source.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
  if (!isArticle(page.relativePath, content, page.frontmatter)) return

  const title = articleTitle(page.relativePath, page.frontmatter)
  // Respect an existing leading H1 (ignoring comments) so the theme does not
  // display the same page heading twice. Internal section headings stay intact.
  const leadingContent = content.replace(/^(?:\s|<!--[\s\S]*?-->)+/, '')
  const hasLeadingHeading = /^#\s+\S/.test(leadingContent)
  return { title, articleTitle: title, showArticleTitle: !hasLeadingHeading }
}
