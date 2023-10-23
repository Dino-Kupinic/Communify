<script setup lang="ts">
import {onMounted, ref} from "vue"

const props = defineProps<{
     color: string
}>()


const hexColors = ["#ff4040","#815eff", "#cf5df6", "#2591fd", "#3b9afd","#037dfc", "#f34545", "#11b54a"]
const rndColor = ref('')

onMounted(() => {
  rndColor.value = props.color.toLowerCase()
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
  max-height: 1.5em;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 4px;
  width: min-content;
}
</style>