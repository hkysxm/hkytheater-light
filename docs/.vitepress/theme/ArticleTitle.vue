<script setup lang="ts">
import { useData } from 'vitepress'

const { page } = useData()
</script>

<template>
  <div v-if="page.showArticleTitle" class="vp-doc">
    <h1 class="article-title">{{ page.articleTitle }}</h1>
  </div>
</template>
