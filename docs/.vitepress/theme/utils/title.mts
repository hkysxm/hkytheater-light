export function formatTitle(filename: string): string {
  let basename = filename.split('/').pop() || ''
  try { basename = decodeURIComponent(basename) } catch { /* Keep literal percent signs in filenames. */ }
  basename = basename
    .replace(/\.(?:md|html)$/i, '')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"')

  // Split out dates rather than replacing them with a placeholder that could
  // also occur in a real filename.
  const title = basename.split(/((?<!\d)\d{4}-\d{2}-\d{2}(?!\d))/g)
    .map(part => /^\d{4}-\d{2}-\d{2}$/.test(part) ? part : part.replace(/[-_]+/g, ' '))
    .join('').replace(/\s+/g, ' ').trim()
  return title.replace(/\p{Default_Ignorable_Code_Point}/gu, '').trim() ? title : '未命名文章'
}

export function articleTitle(path: string, frontmatter: Record<string, unknown> = {}): string {
  return typeof frontmatter.title === 'string' && frontmatter.title.trim()
    ? frontmatter.title.trim()
    : formatTitle(path)
}

export function isArticle(path: string, content: string, frontmatter: Record<string, unknown> = {}): boolean {
  return !/(?:^|\/)(?:index|README)\.(?:md|html)$/i.test(path)
    && !['', '/'].includes(path)
    && (!frontmatter.layout || frontmatter.layout === 'doc')
    && !!content.trim() && content.trim() !== 'null'
}
