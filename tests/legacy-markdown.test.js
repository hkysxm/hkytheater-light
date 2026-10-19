const assert = require('node:assert/strict')
const { test } = require('node:test')
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt().use(require('../docs/.vuepress/legacy-markdown'))

test('legacy notices retain Markdown and reference links', () => {
  const html = md.render('[scode type="yellow"]注意 **备份**，查看[文档][1][/scode]\n\n[1]: https://example.com')
  assert.match(html, /class="custom-block warning"/)
  assert.match(html, /<strong>备份<\/strong>/)
  assert.match(html, /href="https:\/\/example.com"/)
  assert.doesNotMatch(html, /\[\/?scode/)
})
test('collapse preserves lists and code, and escapes its title', () => {
  const html = md.render('[collapse title="<img>" status="false"]\n- one\n- two\n\n```text\n[/collapse]\n```\n[/collapse]')
  assert.match(html, /<summary>&lt;img&gt;<\/summary>/)
  assert.match(html, /<ul>/)
  assert.match(html, /<code class="language-text">\[\/collapse\]/)
  assert.doesNotMatch(html, /details[^>]* open/)
})
test('code examples stay literal and malformed tags remain visible', () => {
  assert.match(md.render('`[post cid="22" /]`'), /<code>\[post/)
  assert.match(md.render('```\n[scode type="red"]example[/scode]\n```'), /<code>\[scode/)
  assert.match(md.render('[scode type="red"]unclosed'), /\[scode/)
})
test('post references and original image paths become usable URLs', () => {
  assert.match(md.render('看[post cid="22" /]'), /href="https:\/\/hky.moe\/archives\/22\/"/)
  assert.match(md.render('![图片](/img/example.png)'), /src="https:\/\/hky.moe\/img\/example.png"/)
  assert.match(md.render('![图片](https://example.com/a.png)'), /src="https:\/\/example.com\/a.png"/)
})
