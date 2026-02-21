<script setup>
import { computed } from 'vue'
import { useCart } from '../stores/cart.js'

const props = defineProps({
  item: Object,
})

const cart = useCart()

const minPrice = computed(() => {
  return Math.min(...props.item.variants.map(v => v.price))
})

const itemCount = computed(() => {
  return cart.state.items
    .filter(ci => ci.itemId === props.item.id)
    .reduce((sum, ci) => sum + ci.quantity, 0)
})

const hasMultipleVariants = computed(() => props.item.variants.length > 1)
</script>

<template>
  <button class="menu-item" @click="$emit('click')">
    <div class="item-image-wrap" v-if="item.image">
      <img :src="item.image" :alt="item.name" class="item-image" />
      <span v-if="item.badge" class="item-badge">{{ item.badge }}</span>
    </div>
    <div class="item-info">
      <h3 class="item-name">{{ item.name }}</h3>
      <p class="item-desc">{{ item.variants[0].description }}</p>
      <div class="item-bottom">
        <span class="item-price">
          {{ hasMultipleVariants ? 'Desde ' : '' }}${{ minPrice.toLocaleString('es-AR') }}
        </span>
        <span v-if="itemCount > 0" class="item-count">{{ itemCount }}</span>
      </div>
    </div>
  </button>
</template>

<style scoped>
.menu-item {
  display: flex;
  gap: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px;
  text-align: left;
  transition: all var(--transition);
  width: 100%;
  align-items: center;
}

.menu-item:active {
  transform: scale(0.98);
  background: var(--bg-elevated);
}

.item-image-wrap {
  position: relative;
  flex-shrink: 0;
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: var(--radius-sm);
  object-fit: contain;
}

.item-badge {
  position: absolute;
  top: -6px;
  left: -6px;
  background: var(--accent);
  color: white;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 8px;
  white-space: nowrap;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.item-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
}

.item-desc {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.item-price {
  font-size: 15px;
  font-weight: 800;
  color: var(--accent);
}

.item-count {
  background: var(--accent);
  color: white;
  font-size: 11px;
  font-weight: 700;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
