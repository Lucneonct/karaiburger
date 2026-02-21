<script setup>
import { ref, computed } from 'vue'
import { useCart } from '../stores/cart.js'

const props = defineProps({
  item: Object,
})

const emit = defineEmits(['close'])
const cart = useCart()

const selectedVariant = ref(
  props.item.variants.length === 1 ? 0 : null
)
const selectedFlavor = ref(null)
const note = ref('')
const showNoteInput = ref(false)
const justAdded = ref(false)

const hasFlavors = computed(() => props.item.flavors?.length > 0)

const canAdd = computed(() => {
  if (selectedVariant.value === null) return false
  if (hasFlavors.value && !selectedFlavor.value) return false
  return true
})

const currentVariant = computed(() => {
  if (selectedVariant.value === null) return null
  return props.item.variants[selectedVariant.value]
})

const itemsInCart = computed(() =>
  cart.state.items.filter(i => i.itemId === props.item.id)
)

const itemTotal = computed(() =>
  itemsInCart.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
)

function addToCart() {
  if (!canAdd.value) return

  const variant = props.item.variants[selectedVariant.value]
  cart.addItem({
    itemId: props.item.id,
    name: props.item.name,
    variantId: variant.id,
    variantName: variant.name,
    price: variant.price,
    category: props.item.category,
    image: props.item.image || null,
    flavor: selectedFlavor.value || '',
    note: note.value.trim(),
  })

  justAdded.value = true
  setTimeout(() => {
    justAdded.value = false
    // Reset for next addition
    if (props.item.variants.length > 1) {
      selectedVariant.value = null
    }
    selectedFlavor.value = null
    note.value = ''
    showNoteInput.value = false
  }, 700)
}

function handleBackdrop(e) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <div class="modal-backdrop" @click="handleBackdrop">
    <div class="modal">
      <button class="modal-close" @click="$emit('close')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div class="modal-hero" v-if="item.image">
        <img :src="item.image" :alt="item.name" />
      </div>

      <div class="modal-body">
        <div class="modal-header">
          <h2>{{ item.name }}</h2>
          <span v-if="item.badge" class="badge">{{ item.badge }}</span>
        </div>

        <!-- Variants -->
        <div class="section" v-if="item.variants.length > 1">
          <h4 class="section-label">Elegí tu tamaño</h4>
          <div class="variant-options">
            <button
              v-for="(v, i) in item.variants"
              :key="v.id"
              :class="['variant-btn', { active: selectedVariant === i }]"
              @click="selectedVariant = i"
            >
              <span class="variant-name">{{ v.name }}</span>
              <span class="variant-price">${{ v.price.toLocaleString('es-AR') }}</span>
              <span class="variant-desc">{{ v.description }}</span>
            </button>
          </div>
        </div>

        <!-- Single variant info -->
        <div v-else class="single-variant">
          <p class="variant-desc-single">{{ item.variants[0].description }}</p>
          <p class="variant-price-single">${{ item.variants[0].price.toLocaleString('es-AR') }}</p>
        </div>

        <!-- Flavors -->
        <div class="section" v-if="hasFlavors">
          <h4 class="section-label">Elegí sabor</h4>
          <div class="flavor-options">
            <button
              v-for="flavor in item.flavors"
              :key="flavor"
              :class="['flavor-btn', { active: selectedFlavor === flavor }]"
              @click="selectedFlavor = flavor"
            >
              {{ flavor }}
            </button>
          </div>
        </div>

        <!-- Note -->
        <div class="section">
          <button
            v-if="!showNoteInput"
            class="add-note-btn"
            @click="showNoteInput = true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Agregar aclaración
          </button>
          <div v-else class="note-wrap">
            <textarea
              v-model="note"
              placeholder="Ej: Sin cebolla, extra salsa..."
              rows="2"
              maxlength="200"
            />
          </div>
        </div>

        <!-- Items already added for this product -->
        <div v-if="itemsInCart.length > 0" class="added-summary">
          <h4 class="section-label">En tu pedido</h4>
          <div
            v-for="(ci, idx) in itemsInCart"
            :key="idx"
            class="added-row"
          >
            <span class="added-qty">{{ ci.quantity }}x</span>
            <span class="added-name">
              {{ ci.variantName }}
              <template v-if="ci.flavor"> · {{ ci.flavor }}</template>
            </span>
            <span class="added-price">${{ (ci.price * ci.quantity).toLocaleString('es-AR') }}</span>
          </div>
          <div class="added-total-row">
            <span>Subtotal</span>
            <span>${{ itemTotal.toLocaleString('es-AR') }}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <button
          :class="['add-btn', { disabled: !canAdd, success: justAdded }]"
          @click="addToCart"
          :disabled="!canAdd || justAdded"
        >
          <template v-if="justAdded">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Agregado
          </template>
          <template v-else-if="currentVariant">
            Agregar — ${{ currentVariant.price.toLocaleString('es-AR') }}
          </template>
          <template v-else>
            Elegí una opción
          </template>
        </button>
        <button
          v-if="itemsInCart.length > 0"
          class="done-btn"
          @click="$emit('close')"
        >
          Listo ✓
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.modal {
  background: var(--bg);
  border-radius: 24px 24px 0 0;
  width: 100%;
  max-width: 480px;
  max-height: 90dvh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: white;
}

.modal-hero {
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  padding: 12px;
}

.modal-hero img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal-body {
  padding: 20px;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.modal-header h2 {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.3px;
}

.badge {
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  white-space: nowrap;
}

.section {
  margin-bottom: 18px;
}

.section-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.variant-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.variant-btn {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 0;
  padding: 14px 16px;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  text-align: left;
  transition: all var(--transition);
}

.variant-btn:active {
  transform: scale(0.98);
}

.variant-btn.active {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.variant-name {
  font-weight: 700;
  font-size: 15px;
  flex: 1;
}

.variant-price {
  font-weight: 800;
  font-size: 15px;
  color: var(--accent);
}

.variant-desc {
  width: 100%;
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.3;
  margin-top: 2px;
}

.single-variant {
  margin-bottom: 18px;
}

.variant-desc-single {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.4;
}

.variant-price-single {
  font-size: 22px;
  font-weight: 800;
  color: var(--accent);
  margin-top: 8px;
}

.flavor-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.flavor-btn {
  padding: 8px 16px;
  border-radius: 20px;
  background: var(--bg-card);
  border: 2px solid var(--border);
  font-size: 13px;
  font-weight: 600;
  transition: all var(--transition);
}

.flavor-btn:active {
  transform: scale(0.96);
}

.flavor-btn.active {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
}

.add-note-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  font-size: 14px;
  color: var(--text-secondary);
  transition: color var(--transition);
}

.add-note-btn:active {
  color: var(--text);
}

.note-wrap textarea {
  font-size: 14px;
}

/* Added items summary */
.added-summary {
  margin-top: 8px;
  padding: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}

.added-summary .section-label {
  margin-bottom: 8px;
}

.added-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 13px;
}

.added-row + .added-row {
  border-top: 1px solid var(--border);
}

.added-qty {
  font-weight: 800;
  color: var(--accent);
  min-width: 24px;
}

.added-name {
  flex: 1;
  color: var(--text-secondary);
}

.added-price {
  font-weight: 700;
}

.added-total-row {
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
  margin-top: 6px;
  border-top: 1px solid var(--border);
  font-size: 14px;
  font-weight: 700;
}

/* Footer */
.modal-footer {
  padding: 0 20px 24px;
  position: sticky;
  bottom: 0;
  background: linear-gradient(to top, var(--bg) 80%, transparent);
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.add-btn {
  width: 100%;
  padding: 16px;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: white;
  font-size: 16px;
  font-weight: 700;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-btn:active:not(.disabled) {
  transform: scale(0.98);
}

.add-btn.disabled {
  background: var(--bg-surface);
  color: var(--text-muted);
  cursor: not-allowed;
}

.add-btn.success {
  background: var(--green);
}

.done-btn {
  width: 100%;
  padding: 14px;
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  border: 2px solid var(--border);
  font-size: 15px;
  font-weight: 700;
  transition: all var(--transition);
}

.done-btn:active {
  transform: scale(0.98);
  border-color: var(--accent);
}
</style>
