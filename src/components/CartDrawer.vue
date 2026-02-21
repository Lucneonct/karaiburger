<script setup>
import { ref, computed, watch } from 'vue'
import { useCart } from '../stores/cart.js'
import { paymentMethods } from '../data/menu.js'

const emit = defineEmits(['close'])
const cart = useCart()

const deliveryType = ref('retiro')
const selectedPayment = ref('efectivo')
const address = ref('')
const preferredTime = ref('')
const timeOption = ref('asap')

const deliveryPayments = computed(() =>
  paymentMethods.filter(p => p.id === 'efectivo' || p.id === 'transferencia')
)

const availablePayments = computed(() =>
  deliveryType.value === 'delivery' ? deliveryPayments.value : paymentMethods
)

// Reset payment if current selection is not available for delivery
watch(deliveryType, (val) => {
  if (val === 'delivery' && !['efectivo', 'transferencia'].includes(selectedPayment.value)) {
    selectedPayment.value = 'efectivo'
  }
})

const resolvedTime = computed(() => {
  if (timeOption.value === 'asap') return ''
  return preferredTime.value
})

function handleBackdrop(e) {
  if (e.target === e.currentTarget) emit('close')
}

function confirmOrder() {
  const payment = paymentMethods.find(p => p.id === selectedPayment.value)
  cart.sendWhatsApp({
    deliveryType: deliveryType.value,
    paymentMethod: payment?.name || 'Efectivo',
    address: deliveryType.value === 'delivery' ? address.value.trim() : '',
    preferredTime: resolvedTime.value,
  })
  cart.clearCart()
  emit('close')
}
</script>

<template>
  <div class="drawer-backdrop" @click="handleBackdrop">
    <div class="drawer">
      <!-- Header -->
      <div class="drawer-header">
        <h2>Tu pedido</h2>
        <button class="close-btn" @click="$emit('close')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <!-- Items -->
      <div class="drawer-items">
        <div v-if="cart.state.items.length === 0" class="empty-cart">
          <p>Tu carrito esta vacio</p>
        </div>

        <div
          v-for="(item, index) in cart.state.items"
          :key="index"
          class="cart-item"
        >
          <div class="cart-item-image" v-if="item.image">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="cart-item-info">
            <h4>{{ item.name }}</h4>
            <p class="cart-item-variant">
              {{ item.variantName }}
              <template v-if="item.flavor"> · {{ item.flavor }}</template>
            </p>
            <p v-if="item.note" class="cart-item-note">{{ item.note }}</p>
          </div>
          <div class="cart-item-right">
            <span class="cart-item-price">
              ${{ (item.price * item.quantity).toLocaleString('es-AR') }}
            </span>
            <div class="qty-controls">
              <button class="qty-btn" @click="cart.updateQuantity(index, -1)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
              <span class="qty-value">{{ item.quantity }}</span>
              <button class="qty-btn" @click="cart.updateQuantity(index, 1)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Combo info -->
      <div v-if="cart.comboCount.value > 0" class="combo-banner">
        <span>*</span>
        <div>
          <strong>{{ cart.comboCount.value }} combo{{ cart.comboCount.value > 1 ? 's' : '' }} aplicado{{ cart.comboCount.value > 1 ? 's' : '' }}</strong>
          <p>Ahorras ${{ cart.totalDiscount.value.toLocaleString('es-AR') }}</p>
        </div>
      </div>

      <!-- Delivery, Payment & Options -->
      <div class="drawer-options" v-if="cart.state.items.length > 0">
        <!-- Delivery type -->
        <div class="option-section">
          <h4 class="option-label">Entrega</h4>
          <div class="toggle-group">
            <button
              :class="['toggle-btn', { active: deliveryType === 'retiro' }]"
              @click="deliveryType = 'retiro'"
            >
              Retiro en local
            </button>
            <button
              :class="['toggle-btn', { active: deliveryType === 'delivery' }]"
              @click="deliveryType = 'delivery'"
            >
              Delivery
            </button>
          </div>
        </div>

        <!-- Delivery address -->
        <Transition name="expand">
          <div v-if="deliveryType === 'delivery'" class="option-section">
            <h4 class="option-label">Direccion (opcional)</h4>
            <input
              v-model="address"
              type="text"
              placeholder="Ej: Av. San Martin 1234"
              class="text-input"
            />
            <p class="option-note">
              El costo de envio se confirma por WhatsApp
            </p>
          </div>
        </Transition>

        <!-- Payment -->
        <div class="option-section">
          <h4 class="option-label">Metodo de pago</h4>
          <div class="payment-options">
            <button
              v-for="pm in availablePayments"
              :key="pm.id"
              :class="['payment-btn', { active: selectedPayment === pm.id }]"
              @click="selectedPayment = pm.id"
            >
              <span class="payment-icon">{{ pm.icon }}</span>
              <span>{{ pm.name }}</span>
            </button>
          </div>
          <p v-if="deliveryType === 'delivery'" class="option-note">
            Solo efectivo o transferencia para delivery
          </p>
        </div>

        <!-- Preferred time -->
        <div class="option-section">
          <h4 class="option-label">Horario</h4>
          <div class="toggle-group">
            <button
              :class="['toggle-btn', { active: timeOption === 'asap' }]"
              @click="timeOption = 'asap'"
            >
              Lo antes posible
            </button>
            <button
              :class="['toggle-btn', { active: timeOption === 'scheduled' }]"
              @click="timeOption = 'scheduled'"
            >
              Elegir hora
            </button>
          </div>
          <Transition name="expand">
            <div v-if="timeOption === 'scheduled'" class="time-input-wrap">
              <input
                v-model="preferredTime"
                type="time"
                class="text-input time-input"
              />
              <p class="option-note">
                Sujeto a disponibilidad, se confirma por WhatsApp
              </p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Footer / Total -->
      <div class="drawer-footer" v-if="cart.state.items.length > 0">
        <div class="total-section">
          <div class="total-row">
            <span>Subtotal</span>
            <span>${{ cart.subtotal.value.toLocaleString('es-AR') }}</span>
          </div>
          <div v-if="cart.totalDiscount.value > 0" class="total-row discount">
            <span>Descuento combo</span>
            <span>-${{ cart.totalDiscount.value.toLocaleString('es-AR') }}</span>
          </div>
          <div class="total-row total">
            <span>Total</span>
            <span>${{ cart.total.value.toLocaleString('es-AR') }}</span>
          </div>
        </div>

        <button class="send-btn" @click="confirmOrder">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.13.556 4.13 1.528 5.87L.06 23.49a.5.5 0 00.611.611l5.62-1.468A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.38-1.568l-.386-.23-3.332.87.87-3.332-.23-.386A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Enviar pedido por WhatsApp
        </button>

        <button class="clear-btn" @click="cart.clearCart()">
          Vaciar carrito
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.drawer {
  background: var(--bg);
  border-radius: 24px 24px 0 0;
  width: 100%;
  max-width: 480px;
  max-height: 92dvh;
  overflow-y: auto;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 12px;
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 5;
}

.drawer-header h2 {
  font-size: 22px;
  font-weight: 800;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-items {
  padding: 0 20px;
}

.empty-cart {
  padding: 40px 0;
  text-align: center;
  color: var(--text-muted);
  font-size: 15px;
}

.cart-item {
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
  align-items: center;
}

.cart-item-image {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-info {
  flex: 1;
  min-width: 0;
}

.cart-item-info h4 {
  font-size: 14px;
  font-weight: 700;
}

.cart-item-variant {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 1px;
}

.cart-item-note {
  font-size: 11px;
  color: var(--text-muted);
  font-style: italic;
  margin-top: 2px;
}

.cart-item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}

.cart-item-price {
  font-size: 14px;
  font-weight: 700;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card);
  border-radius: 20px;
  padding: 2px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
}

.qty-btn:active {
  transform: scale(0.9);
  background: var(--accent);
}

.qty-value {
  font-size: 13px;
  font-weight: 700;
  min-width: 18px;
  text-align: center;
}

.combo-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 20px;
  padding: 12px 16px;
  background: var(--green-soft);
  border: 1px solid rgba(47, 158, 68, 0.2);
  border-radius: var(--radius-sm);
  font-size: 14px;
}

.combo-banner span:first-child {
  font-size: 24px;
}

.combo-banner strong {
  color: var(--green);
}

.combo-banner p {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 1px;
}

.drawer-options {
  padding: 16px 20px;
  border-top: 1px solid var(--border);
}

.option-section {
  margin-bottom: 18px;
}

.option-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.toggle-group {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  flex: 1;
  padding: 10px;
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  border: 2px solid var(--border);
  font-size: 14px;
  font-weight: 600;
  transition: all var(--transition);
}

.toggle-btn.active {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.text-input {
  width: 100%;
  padding: 10px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 14px;
  outline: none;
  transition: border-color var(--transition);
}

.text-input:focus {
  border-color: var(--accent);
}

.time-input-wrap {
  margin-top: 10px;
}

.time-input {
  max-width: 160px;
}

.option-note {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 6px;
  font-style: italic;
}

.payment-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.payment-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  border: 2px solid var(--border);
  font-size: 13px;
  font-weight: 600;
  transition: all var(--transition);
}

.payment-btn.active {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.payment-icon {
  font-size: 18px;
}

.drawer-footer {
  padding: 16px 20px 28px;
  border-top: 1px solid var(--border);
  position: sticky;
  bottom: 0;
  background: var(--bg);
}

.total-section {
  margin-bottom: 16px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.total-row.discount {
  color: var(--green);
  font-weight: 600;
}

.total-row.total {
  font-size: 18px;
  font-weight: 800;
  color: var(--text);
  padding-top: 8px;
  margin-top: 4px;
  border-top: 1px solid var(--border);
}

.send-btn {
  width: 100%;
  padding: 16px;
  border-radius: var(--radius-sm);
  background: #25d366;
  color: white;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all var(--transition);
  margin-bottom: 10px;
}

.send-btn:active {
  transform: scale(0.98);
  background: #1da851;
}

.clear-btn {
  width: 100%;
  padding: 10px;
  font-size: 13px;
  color: var(--text-muted);
  transition: color var(--transition);
}

.clear-btn:active {
  color: var(--accent);
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
