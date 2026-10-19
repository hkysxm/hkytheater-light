module.exports = {
  title: 'hkytheater-light',
  description: 'hky.moe 的轻量版',
  base: '/',
  locales: { '/': { lang: 'zh-CN' } },
  themeConfig: { sidebar: 'auto', nav: [{ text: '文章', link: '/' }] },
  plugins: [{ extendPageData: require('./article-pages') }],
  extendMarkdown: md => md.use(require('./legacy-markdown'))
}
