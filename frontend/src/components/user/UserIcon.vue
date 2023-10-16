<script setup lang="ts">
import {onMounted, ref} from "vue"

const hexColors = ["#d77ef3", "#c74aee", "#0262c4", "#3b9afd","#037dfc", "#f34545", "#11b54a"]
const rndColor = ref("")

defineProps<{
  initials: string;
}>()

onMounted(() => {
  rndColor.value = hexColors[Math.floor(Math.random() * hexColors.length)]
})

</script>

<template>
  <div>
    <h2>{{ initials }}</h2>
  </div>

</template>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind(rndColor);
  width: 3em;
  height: 3em;
  border-radius: 30px;
  margin-left: 1rem;
  margin-right: 1rem;
}

h2 {
  color: var(--color-text);
}


</style>