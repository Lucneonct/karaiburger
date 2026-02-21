<script setup>
import { ref } from 'vue'

const offers = [
  {
    id: 1,
    title: 'Combo Burger',
    description: 'Hamburguesa + Papas + Bebida lata',
    savings: '$1.500 OFF',
    color: '#e63946',
  },
  {
    id: 2,
    title: 'Promo Lunes',
    description: 'Promos especiales todos los lunes',
    savings: 'Ver promo',
    color: '#f59f00',
  },
  {
    id: 3,
    title: 'Promo Jueves',
    description: 'Promos especiales todos los jueves',
    savings: 'Ver promo',
    color: '#2f9e44',
  },
]

const currentOffer = ref(0)
let interval = null

function startAutoplay() {
  interval = setInterval(() => {
    currentOffer.value = (currentOffer.value + 1) % offers.length
  }, 4000)
}

function stopAutoplay() {
  clearInterval(interval)
}

startAutoplay()
</script>

<template>
  <div class="offers-container">
    <div
      class="offers-track"
      :style="{ transform: `translateX(-${currentOffer * 100}%)` }"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
    >
      <div
        v-for="offer in offers"
        :key="offer.id"
        class="offer-card"
      >
        <div class="offer-content">
          <span class="offer-badge" :style="{ background: offer.color }">
            {{ offer.savings }}
          </span>
          <h3>{{ offer.title }}</h3>
          <p>{{ offer.description }}</p>
        </div>
      </div>
    </div>
    <div class="dots">
      <button
        v-for="(_, i) in offers"
        :key="i"
        :class="['dot', { active: i === currentOffer }]"
        @click="currentOffer = i"
      />
    </div>
  </div>
</template>

<style scoped>
.offers-container {
  padding: 0 16px;
  margin-bottom: 8px;
  overflow: hidden;
}

.offers-track {
  display: flex;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.offer-card {
  min-width: 100%;
  padding: 0 2px;
}

.offer-content {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.offer-badge {
  align-self: flex-start;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.3px;
}

h3 {
  font-size: 16px;
  font-weight: 700;
  margin-top: 4px;
}

p {
  font-size: 13px;
  color: var(--text-secondary);
}

.dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 10px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-muted);
  transition: all var(--transition);
  padding: 0;
}

.dot.active {
  background: var(--accent);
  width: 18px;
  border-radius: 3px;
}
</style>
