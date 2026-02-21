<script setup>
defineProps({
  categories: Array,
  active: String,
})

defineEmits(['select'])
</script>

<template>
  <nav class="category-nav">
    <div class="category-scroll">
      <button
        v-for="cat in categories"
        :key="cat.id"
        :class="['category-chip', { active: active === cat.id }]"
        @click="$emit('select', cat.id)"
      >
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.category-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(to bottom, var(--bg) 70%, transparent);
  padding: 12px 0 16px;
}

.category-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 0 16px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.category-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  white-space: nowrap;
  font-size: 13px;
  font-weight: 600;
  transition: all var(--transition);
  flex-shrink: 0;
}

.category-chip:active {
  transform: scale(0.96);
}

.category-chip.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.cat-icon {
  font-size: 16px;
}
</style>
