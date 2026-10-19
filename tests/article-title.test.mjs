import assert from 'node:assert/strict'
import { test } from 'node:test'
import { formatTitle, articleTitle, isArticle } from '../docs/.vitepress/theme/utils/title.mts'
import { articlePageData } from '../docs/.vitepress/article-page.mts'

test('filename separators become readable text while dates remain unchanged', () => {
  assert.equal(formatTitle('2026-10-19-VitePress_Blog-Setup.md'), '2026-10-19 VitePress Blog Setup')
  assert.equal(formatTitle('/Linux_Server_Config.html'), 'Linux Server Config')
  assert.equal(formatTitle('backup_2026-10-19-Notes.md'), 'backup 2026-10-19 Notes')
  assert.equal(formatTitle('100%-测试.md'), '100% 测试')
  assert.equal(formatTitle('\uFE0F.md'), '未命名文章')
  assert.equal(formatTitle('-iPhone-12-mini-使用体验-.md'), 'iPhone 12 mini 使用体验')
  assert.equal(formatTitle('/Leopold-银轴开箱&amp;体验.html'), 'Leopold 银轴开箱&体验')
  assert.equal(formatTitle('/%E6%B5%8B%E8%AF%95-%E6%96%87%E7%AB%A0.html'), '测试 文章')
})
test('manual titles take precedence in both list and page metadata', () => {
  const frontmatter = { title: '自定义标题 - 保留原样' }
  const page = { relativePath: 'Linux_Server.md', frontmatter }
  const data = articlePageData(page, '原有正文\n\n## 小节')
  assert.equal(data.title, articleTitle(page.relativePath, frontmatter))
  assert.equal(data.articleTitle, frontmatter.title)
  assert.equal(data.showArticleTitle, true)
})
test('page title is based on the filename instead of the first section heading', () => {
  const data = articlePageData({ relativePath: '2026-10-19-VitePress_Blog-Setup.md', frontmatter: {} }, '正文\n\n# 安装步骤\n\n内容')
  assert.equal(data.title, '2026-10-19 VitePress Blog Setup')
  assert.equal(data.articleTitle, data.title)
  assert.equal(data.showArticleTitle, true)
})
test('existing leading H1 is not duplicated, including after frontmatter and comments', () => {
  const source = '---\ntitle: 标题\n---\n\n<!-- intro -->\n# 标题\n\n正文'
  const data = articlePageData({ relativePath: '文章.md', frontmatter: { title: '标题' } }, source)
  assert.equal(data.showArticleTitle, false)
  assert.equal(data.title, '标题')
})
test('home, README, placeholder and custom layouts receive no article heading', () => {
  for (const path of ['/', 'index.md', 'README.md', '/README.html']) assert.equal(isArticle(path, '正文'), false)
  assert.equal(articlePageData({ relativePath: 'test.md', frontmatter: {} }, 'null'), undefined)
  for (const layout of ['home', 'page']) {
    assert.equal(articlePageData({ relativePath: 'custom.md', frontmatter: { layout } }, '正文'), undefined)
  }
})
