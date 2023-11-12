<script setup lang="ts">
import {ref} from "vue"

defineProps<{
  accordHeaderText: string
}>()

const visibility = ref("none")
const marginBottom = ref("2%")
const borderRadius = ref("1rem 1rem 1rem 1rem")

function reverseVisibility () : void {
  if (visibility.value === "none") {
    visibility.value = "visible"
    marginBottom.value = "0"
    borderRadius.value = "1rem 1rem 0 0"
  } else {
    visibility.value = "none"
    marginBottom.value = "2%"
    borderRadius.value = "1rem 1rem 1rem 1rem"
  }
}


</script>

<template>
<div id="accord-header" @click="reverseVisibility">{{accordHeaderText}}</div>
<div id="accordion-content">
  <slot name="accordion-content"></slot>
</div>
</template>

<style scoped>
#accordion-content {
  display: v-bind(visibility);
  transition: 0.2s ease-out;
}

#accord-header {
  border-radius: v-bind(borderRadius);
  padding: 2%;
  border: 1px solid var(--color-border-soft);
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: v-bind(marginBottom);
  font-weight: 500;
}

#accordion-content {
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: 1%;
  border-radius: 0 0 1rem 1rem;
  border-left: 1px solid var(--color-border-soft);
  border-right: 1px solid var(--color-border-soft);
  border-bottom: 1px solid var(--color-border-soft);
}

#accord-header {
  overflow: hidden;
  cursor: pointer;
}

#accord-header:hover {
  color: var(--neutral-300)
}




</style>