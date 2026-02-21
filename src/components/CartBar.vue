<script setup>
import { useCart } from '../stores/cart.js'

const cart = useCart()
</script>

<template>
  <button class="cart-bar" @click="$emit('click')">
    <div class="cart-bar-left">
      <div class="cart-count">{{ cart.totalItems.value }}</div>
      <span>Ver pedido</span>
    </div>
    <div class="cart-bar-right">
      ${{ cart.total.value.toLocaleString('es-AR') }}
    </div>
  </button>
</template>

<style scoped>
.cart-bar {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 448px;
  padding: 14px 20px;
  background: var(--accent);
  border-radius: var(--radius);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  box-shadow: 0 8px 32px rgba(230, 57, 70, 0.4);
  transition: all var(--transition);
}

.cart-bar:active {
  transform: translateX(-50%) scale(0.98);
}

.cart-bar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
}

.cart-count {
  width: 26px;
  height: 26px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
}

.cart-bar-right {
  font-size: 16px;
  font-weight: 800;
}
</style>
