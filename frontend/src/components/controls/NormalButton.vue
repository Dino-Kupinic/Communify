<script setup lang="ts">

</script>

<template>
  <button>
    <div>
      <slot></slot>
    </div>
  </button>
</template>

<style scoped>
button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.3rem 1rem;
  font-size: 1.5rem;
  font-family: -apple-system, 'Inter', sans-serif;
  border-radius: 1rem;
  color: var(--color-text);
  border: none;
  background-color: var(--brand-500);
}

button:hover {
  background-color: var(--brand-400);
  color: var(--color-text-soft);
}
</style>



