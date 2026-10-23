import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ArticleTitle from './ArticleTitle.vue'
import ThemeModeSwitch from './ThemeModeSwitch.vue'
import './appearance.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(ArticleTitle),
      'nav-bar-content-after': () => h(ThemeModeSwitch)
    })
  }
}
