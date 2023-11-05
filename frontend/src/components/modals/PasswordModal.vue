<script setup lang="ts">

import Modal from "@/components/modals/Modal.vue"
import InputField from "@/components/controls/InputField.vue"
import {useVModel} from "@vueuse/core"

const props = defineProps<{
  modelValue : string
}>()

let emit = defineEmits(["joined"])

const input = useVModel(props, "modelValue", emit)

function checkPswd () {
  console.log("on emit `joined` value is: " + input.value)
  emit("joined")
}
</script>

<template>
<Modal modal-title="Room-Login">
  <template #modal-btn>
    <slot name="password-modal-btn"></slot>
  </template>
  <template #modal-content>
    <InputField v-model="input" label="Enter Password" type="password"></InputField>
  </template>
  <template #left-btn-slot>
    <span @click="checkPswd">Submit</span>
  </template>
</Modal>
</template>

<style scoped>
span {
  font-weight: bold;
  cursor: pointer;
}
</style>