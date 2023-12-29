<script setup lang="ts">
import {Toggle} from "@/components/ui/toggle"
import {useColorMode} from "@vueuse/core"
import {onMounted, ref, watch, computed} from "vue"

const mode = useColorMode()

const toggle = ref<boolean>(false)

onMounted(() => {
  if (!mode.preference)
    mode.preference = "dark"
  toggle.value = mode.value === "light"
})

watch(toggle, () => {
  const value = toggle.value ? "light" : "dark"
  mode.preference = mode.value = value
})

</script>

<template>
  <div>
    <p class="text-sm">Preference</p>
    <Toggle v-model:pressed="toggle" size="sm">
      <div class="mr-2">
        <v-icon v-if="mode === 'light'" name="io-sunny"/>
        <v-icon v-else name="io-moon"/>
      </div>
      <span>{{ mode }}</span>
    </Toggle>
  </div>
</template>

