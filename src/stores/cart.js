import { reactive, computed } from 'vue'
import { comboDiscount } from '../data/menu.js'

const STORAGE_KEY = 'karai-cart'

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const state = reactive({
  items: loadCart(),
  isOpen: false,
})

export function useCart() {
  const totalItems = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const comboCount = computed(() => {
    const burgers = state.items.filter(i =>
      ['especial', 'hamburguesas'].includes(i.category)
    ).reduce((s, i) => s + i.quantity, 0)
    const sides = state.items.filter(i => i.category === 'acompañamientos')
      .reduce((s, i) => s + i.quantity, 0)
    const drinks = state.items.filter(i => i.category === 'bebidas')
      .reduce((s, i) => s + i.quantity, 0)
    return Math.min(burgers, sides, drinks)
  })

  const totalDiscount = computed(() => comboCount.value * comboDiscount)

  const total = computed(() => subtotal.value - totalDiscount.value)

  const comboHint = computed(() => {
    const burgers = state.items.filter(i =>
      ['especial', 'hamburguesas'].includes(i.category)
    ).reduce((s, i) => s + i.quantity, 0)
    const sides = state.items.filter(i => i.category === 'acompañamientos')
      .reduce((s, i) => s + i.quantity, 0)
    const drinks = state.items.filter(i => i.category === 'bebidas')
      .reduce((s, i) => s + i.quantity, 0)

    if (burgers === 0) return null

    const missing = []
    if (sides < burgers) missing.push({ label: 'Papas', icon: '🍟', category: 'acompañamientos' })
    if (drinks < burgers) missing.push({ label: 'Bebida', icon: '🥤', category: 'bebidas' })

    if (missing.length === 0) return null

    return {
      missing,
      potentialSavings: (Math.min(burgers, sides + (missing.some(m => m.category === 'acompañamientos') ? 0 : 1), drinks + (missing.some(m => m.category === 'bebidas') ? 0 : 1)) + 1) * comboDiscount,
    }
  })

  function addItem(item) {
    const existing = state.items.find(
      i => i.variantId === item.variantId && i.flavor === item.flavor && i.note === item.note
    )
    if (existing) {
      existing.quantity++
    } else {
      state.items.push({ ...item, quantity: 1 })
    }
    saveCart(state.items)
  }

  function removeItem(index) {
    state.items.splice(index, 1)
    saveCart(state.items)
  }

  function updateQuantity(index, delta) {
    const item = state.items[index]
    if (!item) return
    item.quantity += delta
    if (item.quantity <= 0) {
      state.items.splice(index, 1)
    }
    saveCart(state.items)
  }

  function clearCart() {
    state.items.splice(0)
    saveCart(state.items)
  }

  function toggleCart() {
    state.isOpen = !state.isOpen
  }

  function openCart() {
    state.isOpen = true
  }

  function closeCart() {
    state.isOpen = false
  }

  function buildWhatsAppMessage({ deliveryType, paymentMethod, address, preferredTime }) {
    let msg = '*Nuevo pedido Karai*\n\n'
    state.items.forEach(item => {
      msg += `- ${item.quantity}x ${item.name} - ${item.variantName}`
      if (item.flavor) msg += ` (${item.flavor})`
      msg += ` | $${formatPrice(item.price * item.quantity)}\n`
      if (item.note) msg += `  Nota: ${item.note}\n`
    })
    msg += `\n*Subtotal:* $${formatPrice(subtotal.value)}`
    if (totalDiscount.value > 0) {
      msg += `\n*Descuento combo (x${comboCount.value}):* -$${formatPrice(totalDiscount.value)}`
    }
    msg += `\n*Total:* $${formatPrice(total.value)}`
    msg += `\n\n*Entrega:* ${deliveryType === 'retiro' ? 'Retiro en el local' : 'Delivery'}`
    if (deliveryType === 'delivery' && address) {
      msg += `\n*Direccion:* ${address}`
    }
    msg += `\n*Pago:* ${paymentMethod}`
    if (preferredTime) {
      msg += `\n*Horario preferido:* ${preferredTime}`
    }
    return msg
  }

  function formatPrice(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  function sendWhatsApp(options) {
    const msg = buildWhatsAppMessage(options)
    const phone = '5493743459164'
    const encoded = encodeURIComponent(msg)
      .replace(/%E2%80%8B/g, '') // remove zero-width spaces
      .replace(/%C2%A0/g, '+')   // replace non-breaking spaces
    const url = `https://wa.me/${phone}?text=${encoded}`
    window.open(url, '_blank')
  }

  return {
    state,
    totalItems,
    subtotal,
    comboCount,
    comboHint,
    totalDiscount,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    sendWhatsApp,
  }
}
