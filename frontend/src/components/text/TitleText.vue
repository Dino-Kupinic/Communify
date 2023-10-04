<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()

</script>

<template>
  <p id="chatroom-title"> {{ title }} </p>
</template>

<style scoped>
#chatroom-title {
  font-size: 1em;

  color: var(--color-text)
}


</style>