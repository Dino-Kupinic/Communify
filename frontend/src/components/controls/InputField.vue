<script setup lang="ts">
import {useVModel} from "@vueuse/core"

interface Props {
  modelValue: string
  type?: string,
  label?: string,
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  label: "Label",
  autocomplete: "off",
})

const emit = defineEmits<{
  update: [modelValue: string]
}>()
const input = useVModel(props, "modelValue", emit)
</script>

<template>
  <div class="form-group">
    <label for="input">{{ label }}</label>
    <slot name="above-input"></slot>
    <input v-model="input" :autocomplete="autocomplete" name="input" :type="type">
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
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--neutral-100);
  border: 1px solid var(--neutral-700);
  border-radius: 0.5rem;
  width: auto;
}

input[type="password"] {
  letter-spacing: 2px;
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