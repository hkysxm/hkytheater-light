const assert = require('node:assert/strict')
const { test } = require('node:test')
const extend = require('../docs/.vuepress/article-pages')

test('homepage uses the article index without rewriting its Markdown', () => {
  const page = { path: '/', frontmatter: {}, _strippedContent: '# Hello VuePress' }
  extend(page)
  assert.equal(page.frontmatter.home, true)
  assert.equal(page._strippedContent, '# Hello VuePress')
})
test('article titles use the filename rather than an arbitrary first section heading', () => {
  const page = { path: '/article.html', relativePath: '文章&amp;笔记.md', frontmatter: {}, title: '步骤', _strippedContent: '正文\n# 步骤' }
  extend(page)
  assert.equal(page.articleTitle, '文章&笔记')
  const titled = { ...page, frontmatter: { title: '自定义标题' } }
  extend(titled)
  assert.equal(titled.articleTitle, '自定义标题')
})
test('placeholder and non-Markdown pages are not listed', () => {
  for (const data of [{ relativePath: 'test.md', _strippedContent: 'null' }, { relativePath: 'empty.md', _strippedContent: '' }, { relativePath: '404.vue', _strippedContent: '404' }]) {
    const page = { path: '/test.html', frontmatter: {}, ...data }
    extend(page)
    assert.equal(page.articleTitle, undefined)
  }
})
