<script setup>
import { ref, computed, watch } from 'vue'
import { categories, menuItems } from './data/menu.js'
import { useCart } from './stores/cart.js'
import AppHeader from './components/AppHeader.vue'
import OffersBanner from './components/OffersBanner.vue'
import CategoryNav from './components/CategoryNav.vue'
import MenuSection from './components/MenuSection.vue'
import CartBar from './components/CartBar.vue'
import CartDrawer from './components/CartDrawer.vue'
import ItemModal from './components/ItemModal.vue'
import ComboHint from './components/ComboHint.vue'

const cart = useCart()
const activeCategory = ref(null)
const selectedItem = ref(null)

const groupedItems = computed(() => {
  return categories.map(cat => ({
    ...cat,
    items: menuItems.filter(item => item.category === cat.id),
  })).filter(cat => cat.items.length > 0)
})

function openItem(item) {
  selectedItem.value = item
}

function closeItem() {
  selectedItem.value = null
}

function scrollToCategory(catId) {
  activeCategory.value = catId
  const el = document.getElementById(`category-${catId}`)
  if (el) {
    const offset = 120
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<template>
  <AppHeader />
  <OffersBanner />
  <CategoryNav
    :categories="categories"
    :active="activeCategory"
    @select="scrollToCategory"
  />

  <ComboHint @navigate="scrollToCategory" />

  <main style="padding: 0 16px;">
    <MenuSection
      v-for="group in groupedItems"
      :key="group.id"
      :category="group"
      :items="group.items"
      @select="openItem"
    />
  </main>

  <Transition name="slide-up">
    <CartBar v-if="cart.totalItems.value > 0" @click="cart.openCart()" />
  </Transition>

  <Transition name="fade">
    <CartDrawer v-if="cart.state.isOpen" @close="cart.closeCart()" />
  </Transition>

  <Transition name="fade">
    <ItemModal
      v-if="selectedItem"
      :item="selectedItem"
      @close="closeItem"
    />
  </Transition>
</template>
