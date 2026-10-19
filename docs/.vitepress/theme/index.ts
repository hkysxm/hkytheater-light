import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ArticleTitle from './ArticleTitle.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(ArticleTitle)
    })
  }
}
