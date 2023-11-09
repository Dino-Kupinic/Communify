<script lang="ts" setup>
import {useVModel} from "@vueuse/core"

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(["update:modelValue", "send"])

const data = useVModel(props, "modelValue", emit)
</script>

<template>
  <input v-model="data" @keydown.enter="emit('send')" autocomplete="false" type="text" maxlength="1000" placeholder="Send Message">
</template>

<style scoped>
input {
  font-size: 1.1em;
  font-weight: 500;
  width: 100%;
  border: 1px solid var(--color-border-soft);
  color: var(--color-text);
  background-color: var(--color-background);
  padding: 0.5% 0.5% 0.5% 1%;
  border-radius: 7rem;
}

input:focus {
  outline: 1px solid var(--brand-400);
  caret-color: var(--brand-300);
}
</style>