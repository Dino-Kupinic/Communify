<script setup lang="ts">
interface Props {
  link?: string,
  opensTab?: boolean
}

withDefaults(defineProps<Props>(), {
  link: "",
  opensTab: false,
})
</script>

<template>
  <a v-if="opensTab"
     class="no-underline text-primary hover:text-blue-400"
     :href="link" target="_blank"
     rel="noopener noreferrer"
  >
    <slot></slot>
  </a>
  <a v-else
     class="no-underline text-primary hover:text-blue-400"
     :href="link"
  >
    <slot></slot>
  </a>
</template>
