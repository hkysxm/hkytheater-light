// Render the original blog's markup without rewriting the archived Markdown.
module.exports = function legacyMarkdown (md) {
  const escape = md.utils.escapeHtml
  const attribute = (source, name) => {
    const match = source.match(new RegExp('\\b' + name + '="([^"]*)"'))
    return match ? match[1] : ''
  }

  md.block.ruler.before('paragraph', 'legacy_container', (state, start, end, silent) => {
    const offset = state.bMarks[start] + state.tShift[start]
    if (state.sCount[start] - state.blkIndent >= 4) return false
    const opening = state.src.slice(offset, state.eMarks[start]).match(/^\[(scode|collapse)\b([^\]]*)\]/)
    if (!opening) return false
    const tag = opening[1]
    const close = '[/' + tag + ']'
    let last = start
    let closeAt = -1
    let fence = null
    for (; last < end; last++) {
      const line = state.src.slice(state.bMarks[last], state.eMarks[last])
      const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/)
      if (marker) {
        if (!fence) fence = marker[1]
        else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null
        continue
      }
      if (!fence && line.trimEnd().endsWith(close)) {
        closeAt = state.eMarks[last] - (line.length - line.lastIndexOf(close))
        break
      }
    }
    if (closeAt < 0) return false
    if (silent) return true
    const attrs = opening[2]
    let html
    if (tag === 'collapse') {
      html = '<details class="legacy-collapse"' + (attribute(attrs, 'status') === 'true' ? ' open' : '') + '><summary>' + escape(attribute(attrs, 'title') || '展开详情') + '</summary>\n'
    } else {
      const color = attribute(attrs, 'type')
      const kind = color === 'red' ? 'danger' : color === 'yellow' ? 'warning' : 'tip'
      html = '<div class="custom-block ' + kind + '">\n'
    }
    const first = state.push('html_block', '', 0)
    first.content = html
    first.map = [start, last + 1]
    md.block.parse(state.src.slice(offset + opening[0].length, closeAt), md, state.env, state.tokens)
    state.push('html_block', '', 0).content = tag === 'collapse' ? '</details>\n' : '</div>\n'
    state.line = last + 1
    return true
  }, { alt: ['paragraph', 'reference', 'blockquote'] })

  md.inline.ruler.before('link', 'legacy_post', (state, silent) => {
    const match = state.src.slice(state.pos).match(/^\[post\s+cid="(\d+)"\s*\/\]/)
    if (!match) return false
    if (!silent) {
      const link = state.push('link_open', 'a', 1)
      link.attrSet('href', 'https://hky.moe/archives/' + match[1] + '/')
      state.push('text', '', 0).content = '原文链接'
      state.push('link_close', 'a', -1)
    }
    state.pos += match[0].length
    return true
  })

  const image = md.renderer.rules.image
  md.renderer.rules.image = (tokens, index, options, env, renderer) => {
    const token = tokens[index]
    const src = token.attrGet('src')
    // The archive contains no /img assets; those belong to the original blog.
    if (src && src.startsWith('/img/')) token.attrSet('src', 'https://hky.moe' + src)
    return image(tokens, index, options, env, renderer)
  }
}
