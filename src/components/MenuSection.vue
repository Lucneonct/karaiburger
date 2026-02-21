<script setup>
import MenuItem from './MenuItem.vue'

defineProps({
  category: Object,
  items: Array,
})

defineEmits(['select'])
</script>

<template>
  <section :id="`category-${category.id}`" class="menu-section">
    <div class="section-header">
      <span class="section-icon">{{ category.icon }}</span>
      <h2>{{ category.name }}</h2>
    </div>
    <div class="items-grid">
      <MenuItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @click="$emit('select', item)"
      />
    </div>
  </section>
</template>

<style scoped>
.menu-section {
  margin-bottom: 28px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  padding-top: 8px;
}

.section-icon {
  font-size: 22px;
}

h2 {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.3px;
}

.items-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
