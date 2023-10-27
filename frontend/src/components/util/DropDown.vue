<script setup lang="ts">


import {useVModel} from "@vueuse/core";

const props = defineProps<{
  modelValue: string | number
  listElements: string[],
  type: string
  label?: string
}>()

const emit = defineEmits<{
  update: [modelValue: string | number]
}>()

const clrInput = useVModel(props, "modelValue", emit)

</script>

<template>
  <label for="input">{{ label }}</label>
  <select v-model="clrInput" id="selection">
    <option v-if="type === 'ColorPicker'" v-for="element in listElements" style="color: v-bind(element)">
      {{ element }}
    </option>
    <option v-else v-for="element in listElements"> {{ element }}</option>
  </select>
</template>

<style scoped>

option {
  display: flex;
  flex-wrap: wrap;
}

select {
  font-size: 1rem;
  margin: 0.5rem;
  padding: 1rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  font-family: "Inter", serif;
  border-radius: 0.5rem;
  width: auto;
  color: var(--color-text);
}

select:focus {
  border: 1px solid var(--brand-500);
  outline: none;
}


label {
  margin: 1rem 0 0.2rem 0;
  padding-left: 0.5rem;
}

</style>