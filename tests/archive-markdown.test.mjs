import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createMarkdownRenderer } from 'vitepress'
import archiveMarkdown from '../docs/.vitepress/archive-markdown.mjs'

const md = await createMarkdownRenderer('docs', { config(md) { md.use(archiveMarkdown) } })

test('quoted code with a missing quote prefix remains code', () => {
  const html = md.render('> ```\n> const link = `<a\nhref="example">text</a>`\n> ```')
  assert.match(html, /(?:&lt;|&#x3C;)a/)
  assert.doesNotMatch(html, /text<\/a>/)
})
test('archived HTML tables match browser structure and document tags stay text', () => {
  assert.match(md.render('<table><tr><td>cell</td></tr></table>'), /<tbody>/)
  assert.match(md.render('放到 <head> 标签中'), /&lt;head&gt;/)
})
test('archived image and malformed external link resolve to their original hosts', () => {
  assert.match(md.render('![image](/img/a.png)'), /src="https:\/\/hky.moe\/img\/a.png"/)
  assert.match(md.render('[store]((https://example.com/path))'), /href="https:\/\/example.com\/path"/)
})
