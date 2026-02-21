<script setup>
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <img src="/img/logo.png" alt="Karaí" class="logo" />
      <div class="header-text">
        <h1>Karaí</h1>
        <p>Armá tu pedido y envialo por WhatsApp</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 24px 16px 16px;
  text-align: center;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 14px;
  justify-content: center;
}

.logo {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  object-fit: contain;
}

.header-text {
  text-align: left;
}

h1 {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: 1;
}

p {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 2px;
}
</style>
