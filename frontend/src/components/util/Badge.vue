<script setup lang="ts">
import {onMounted, ref} from "vue"

const hexColors = ["#ba0c0c","#6443de", "#c74aee", "#0262c4", "#3b9afd","#037dfc", "#f34545", "#11b54a"]
const rndColor = ref('')

onMounted(() => {
  rndColor.value = hexColors[Math.floor(Math.random() * hexColors.length)]
})

</script>

<template>
  <span id="badge">
    #
    <slot></slot>
  </span>
</template>

<style scoped>
#badge {
  background-color: v-bind(rndColor);
  top: auto;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 1%;
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 85%;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 4px;
  width: min-content;
}
</style>