<script setup>
import { useCart } from '../stores/cart.js'
import { comboDiscount } from '../data/menu.js'

defineEmits(['navigate'])

const cart = useCart()
</script>

<template>
  <div v-if="cart.comboHint.value" class="combo-hint">
    <div class="combo-hint-text">
      <span class="combo-tag">-${{ comboDiscount.toLocaleString('es-AR') }}</span>
      <span>Sumá
        <template v-for="(m, i) in cart.comboHint.value.missing" :key="m.category">
          <template v-if="i > 0"> + </template>
          <strong>{{ m.icon }} {{ m.label }}</strong>
        </template>
        y armás un combo
      </span>
    </div>
    <div class="combo-hint-actions">
      <button
        v-for="m in cart.comboHint.value.missing"
        :key="m.category"
        class="combo-go-btn"
        @click="$emit('navigate', m.category)"
      >
        {{ m.icon }} Ir a {{ m.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.combo-hint {
  margin: 0 16px 12px;
  padding: 14px 16px;
  background: var(--green-soft);
  border: 1px solid rgba(47, 158, 68, 0.2);
  border-radius: var(--radius);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.combo-hint-text {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  line-height: 1.4;
  flex-wrap: wrap;
}

.combo-tag {
  background: var(--green);
  color: white;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 6px;
  white-space: nowrap;
  flex-shrink: 0;
}

.combo-hint-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.combo-go-btn {
  flex: 1;
  padding: 8px 12px;
  border-radius: 20px;
  background: var(--green);
  color: white;
  font-size: 12px;
  font-weight: 700;
  transition: all var(--transition);
  white-space: nowrap;
}

.combo-go-btn:active {
  transform: scale(0.96);
}
</style>
