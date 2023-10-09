<script setup lang="ts">
interface Props {
  to: string
  hollow?: boolean
  width?: string
}

withDefaults(defineProps<Props>(), {
  width: "14rem"
})

</script>

<template>
  <RouterLink :to="to">
    <button :class="{ 'hollow': hollow }">
      <slot>Ok</slot>
    </button>
  </RouterLink>
</template>

<style scoped>
button {
  margin: 1rem 1rem;
  width: 14rem;
  background-color: var(--brand-500);
  border-radius: 1.4rem;
  padding-right: 1rem;
  border: solid transparent;
  color: var(--neutral-100);
  font-family: "Inter", serif;
  font-weight: 400;
  font-size: 1.2rem;
  height: 3rem;
}

button.hollow {
  margin: 1rem 1rem;
  width: 14rem;
  background-color: var(--color-background);
  border-radius: 1.4rem;
  border: 2px solid var(--brand-500);
  padding-right: 1rem;
  color: var(--brand-500);
  font-weight: 400;
  font-family: "Inter", serif;
  font-size: 1.2rem;
  height: 3rem;
}

button:hover {
  color: var(--neutral-100);
  background-color: var(--brand-400);
  transition: all 0.3s;
  cursor: pointer;
}
</style>