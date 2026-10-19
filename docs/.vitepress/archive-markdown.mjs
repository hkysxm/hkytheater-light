import { parseFragment, serialize } from 'parse5'

// Compatibility at render time: the archived source files remain unchanged.
export default function archiveMarkdown(md) {
  md.core.ruler.before('normalize', 'archive_blockquote_fences', state => {
    // Older posts sometimes omit > on a continuation line in a quoted code fence.
    // Markdown-it otherwise closes the code block and treats code as live HTML.
    state.src = state.src.replace(/^( *>\s*)(`{3,}|~{3,})([^\n]*)\n([\s\S]*?)^ *>\s*\2\s*$/gm,
      (_match, prefix, fence, language, body) => prefix + fence + language + '\n'
        + body.split('\n').map(line => line && !/^ *>/.test(line) ? prefix + line : line).join('\n')
        + prefix + fence)
  })
  md.core.ruler.after('inline', 'archive_external_links', state => {
    for (const block of state.tokens) {
      for (const token of block.children || []) {
        if (token.type !== 'link_open') continue
        const href = token.attrGet('href')
        // One imported Markdown link wraps its external URL in extra parentheses.
        if (href && /^\(https?:\/\/[^\s]+\)$/.test(href)) token.attrSet('href', href.slice(1, -1))
      }
    }
  })
  const image = md.renderer.rules.image
  md.renderer.rules.image = (tokens, index, options, env, renderer) => {
    const token = tokens[index]
    const src = token.attrGet('src')
    if (src?.startsWith('/img/')) token.attrSet('src', `https://hky.moe${src}`)
    return image(tokens, index, options, env, renderer)
  }
  for (const name of ['html_block', 'html_inline']) {
    const render = md.renderer.rules[name]
    md.renderer.rules[name] = (tokens, index, options, env, renderer) => {
      tokens[index].content = tokens[index].content.replace(/\bsrc=(['"])\/img\//g, 'src=$1https://hky.moe/img/')
      // Browser HTML parsing inserts tbody; normalize before Vue compiles it so
      // server markup and browser hydration agree for the original HTML tables.
      if (name === 'html_block' && /^\s*<table\b/.test(tokens[index].content)) {
        tokens[index].content = serialize(parseFragment(tokens[index].content))
      }
      // A literal <head> in prose is explanatory text, not a page head element.
      if (name === 'html_inline' && /^<\/?(?:head|body|html)\b/i.test(tokens[index].content)) {
        return md.utils.escapeHtml(tokens[index].content)
      }
      return render(tokens, index, options, env, renderer)
    }
  }
}
