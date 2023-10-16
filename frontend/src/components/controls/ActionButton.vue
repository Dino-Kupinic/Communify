<script setup lang="ts">
interface Props {
  margin?: string,
  width?: string,
  height?: string,
  hollow?: boolean,
  glow?: boolean
}

withDefaults(defineProps<Props>(), {
  margin: "0.5rem 0.5rem",
  width: "auto",
  height: "2rem",
  hollow: false,
})
</script>

<template>
  <button :class="{ 'hollow': hollow, 'glow': glow }">
    <div>
      <slot></slot>
    </div>
  </button>
</template>

<style scoped>
button {
  margin: v-bind(margin);
  width: v-bind(width);
  background-color: var(--brand-500);
  border-radius: 1.2rem;
  border: 1px solid transparent;
  color: var(--color-text);
  font-weight: 400;
  font-size: 1rem;
  height: v-bind(height);
}

.hollow {
  background-color: var(--color-background-very-soft);
  border-radius: 1.2rem;
  border: 1px solid var(--neutral-500);
  color: var(--color-text);
  font-weight: 400;
  font-size: 1rem;
  height: v-bind(height);
}

.glow:hover {
  -webkit-box-shadow: 0 0 139px 4px rgba(18, 142, 237, 0.71);
  -moz-box-shadow: 0 0 139px 4px rgba(18, 142, 237, 0.71);
  box-shadow: 0 0 139px 4px rgba(18, 142, 237, 0.71);
}

button:hover {
  color: var(--neutral-100);
  background-color: var(--brand-500);
  transition: all 0.3s;
  cursor: pointer;
}

button {
  display: flex;
  align-content: center;
}

div {
  display: flex;
}
</style>