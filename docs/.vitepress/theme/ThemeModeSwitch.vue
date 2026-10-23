<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { useData } from 'vitepress'
import { onMounted, watch } from 'vue'

// Share VitePress's own preference rather than maintaining a second theme state.
// Its built-in bootstrap applies the saved/system theme before the first paint.
const mode = useStorage<'auto' | 'light' | 'dark'>('vitepress-theme-appearance', 'auto', undefined, {
  initOnMounted: true
})
const { isDark } = useData()

onMounted(() => {
  watch(isDark, dark => {
    const color = dark ? '#1b1b1f' : '#ffffff'
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach(meta => { meta.content = color })
  }, { immediate: true })
})
</script>

<template>
  <select v-model="mode" class="theme-mode-switch" aria-label="颜色主题" title="颜色主题">
    <option value="auto">自动</option>
    <option value="light">浅色</option>
    <option value="dark">深色</option>
  </select>
</template>

<style scoped>
.theme-mode-switch {
  flex-shrink: 0;
  min-height: 44px;
  margin-left: 12px;
  padding: 6px 24px 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
  appearance: auto;
}

.theme-mode-switch:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

@media (max-width: 767px) {
  .theme-mode-switch {
    margin-left: 4px;
  }
}
</style>
