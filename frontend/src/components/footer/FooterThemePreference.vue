<script setup lang="ts">
import {Toggle} from "@/components/ui/toggle"
import {useColorMode} from "@vueuse/core"
import {onMounted, ref, watch, computed} from "vue"

const mode = useColorMode()

const lightSelected = ref<boolean>(false)
const darkSelected = ref<boolean>(false)

onMounted(() => {
  if (!mode.preference)
    mode.preference = "dark"

  const currentMode = mode.value
  lightSelected.value = currentMode === "light"
  darkSelected.value = currentMode === "dark"
})

watch(lightSelected, () => {
  const value = lightSelected.value ? "light" : "dark"
  mode.preference = mode.value = value
  darkSelected.value = !lightSelected.value
})

watch(darkSelected, () => {
  const value = darkSelected.value ? "dark" : "light"
  mode.preference = mode.value = value
  lightSelected.value = !darkSelected.value
})

const lightToggle = computed(() => lightSelected.value ? "on" : "off")
const darkToggle = computed(() => darkSelected.value ? "on" : "off")
</script>

<template>
  <div>
    <p class="text-sm">Preference</p>
    <Toggle :data-state="lightToggle" v-model:pressed="lightSelected" size="sm">
      <v-icon name="io-sunny"/>
    </Toggle>
    <Toggle :data-state="darkToggle" v-model:pressed="darkSelected" size="sm">
      <v-icon name="io-moon"/>
    </Toggle>
  </div>
</template>

