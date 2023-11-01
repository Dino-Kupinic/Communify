<script setup lang="ts">
import {useVModel} from "@vueuse/core"

interface Props {
  modelValue: any
  type?: string,
  label?: string,
  autocomplete?: string
  placeholder?: string
  min?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  label: "Label",
  autocomplete: "off",
})

const emit = defineEmits<{
  update: [modelValue: string | number]
}>()
const input = useVModel(props, "modelValue", emit)
</script>

<template>
  <div class="form-group">
    <label for="input">{{ label }}</label>
    <slot name="above-input"></slot>
    <input v-model="input" :autocomplete="autocomplete" name="input" :type="type" :placeholder="placeholder" :min="min">
    <slot name="below-input"></slot>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
}

input {
  font-size: 1rem;
  margin: 0.5rem;
  padding: 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  font-family: "Inter", serif;
  border-radius: 0.5rem;
  width: auto;
}

input[type="password"] {
  letter-spacing: 1px;
}

input:focus {
  border: 1px solid var(--brand-500);
  outline: none;
}

label {
  margin: 1rem 0 0.2rem 0;
  padding-left: 0.5rem;
}
</style>