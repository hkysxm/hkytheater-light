---
layout: home
hero:
  name: hkytheater-light
  text: hky.moe 的轻量版
  tagline: 文章归档
  actions:
    - theme: brand
      text: 浏览文章
      link: /#文章列表
---

<script setup>
import { data as articles } from './.vitepress/articles.data.mts'
</script>

## 文章列表

共 {{ articles.length }} 篇文章。

<ul>
  <li v-for="article in articles" :key="article.url">
    <a :href="article.url">{{ article.title }}</a>
  </li>
</ul>
