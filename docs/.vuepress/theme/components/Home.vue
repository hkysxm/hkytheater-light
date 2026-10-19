<template>
  <main class="article-home" aria-labelledby="article-heading">
    <header>
      <h1 id="article-heading">{{ $site.title }}</h1>
      <p>{{ $site.description }}</p>
    </header>
    <section aria-labelledby="article-list-heading">
      <h2 id="article-list-heading">文章列表 <span>（{{ articles.length }} 篇）</span></h2>
      <ul class="article-list">
        <li v-for="article in articles" :key="article.path">
          <router-link :to="article.path">{{ article.articleTitle }}</router-link>
        </li>
      </ul>
      <p v-if="!articles.length">暂无文章。</p>
    </section>
  </main>
</template>

<script>
export default {
  computed: {
    articles () {
      return this.$site.pages.filter(page => page.articleTitle)
        .sort((a, b) => a.articleTitle.localeCompare(b.articleTitle, 'zh-CN'))
    }
  }
}
</script>

<style lang="stylus">
.article-home
  max-width 960px
  margin 0 auto
  padding 5rem 1.5rem 3rem
  header
    margin-bottom 2rem
  h2 span
    color #6a737d
    font-size 1rem
    font-weight normal
  .article-list
    list-style none
    padding 0
    li
      border-bottom 1px solid #eaecef
    a
      display block
      padding .9rem 0
      line-height 1.7
      overflow-wrap anywhere
</style>
