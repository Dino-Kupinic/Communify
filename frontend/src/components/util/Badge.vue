<script setup lang="ts">
import {onMounted, ref} from "vue"

const props = defineProps<{
  color: string
  NoBadgeSign?: boolean
}>()

const backgroundColor = ref<string>("")
const fontColor = ref<string>("")

const colorsMap = new Map<string, string[]>()
colorsMap.set("Red", ["#ba0c0c", "#fde4e4"])
colorsMap.set("Blue", ["#0262c4", "#e3f1ff"])
colorsMap.set("Green", ["#11b54a", "#e5fded"])
colorsMap.set("Yellow", ["#f3dd0c", "#1b1801"])
colorsMap.set("Purple", ["#8e11b5", "#f7e5fd"])
colorsMap.set("Teal", ["#02c3d1", "#d6feff"])
colorsMap.set("Orange", ["#e67300", "#fcf1e1"])
colorsMap.set("Brown", ["#753b01", "#fcf1e1"])

onMounted(() => {
  if (colorsMap.has(props.color)) {
    const color = colorsMap.get(props.color)
    if (color) {
      backgroundColor.value = color[0]
      fontColor.value = color[1]
    }
  }
})

</script>

<template>
  <span v-if="props.color && !props.NoBadgeSign" class="badge">
    #
    <slot></slot>
  </span>
  <span v-else class="badge">
    <slot></slot>
  </span>
</template>

<style scoped>
.badge {
  background-color: v-bind(backgroundColor);
  color: v-bind(fontColor);
  top: auto;
  margin-left: 1%;
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