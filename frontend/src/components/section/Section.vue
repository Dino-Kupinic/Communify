<script setup lang="ts">

interface Props {
  bgColor?: string
}

withDefaults(defineProps<Props>(), {
  bgColor: "var(--error-700)",
})

</script>

<template>
  <div class="sectionOutside">
    <slot></slot>
  </div>
</template>

<style scoped>
  .sectionOutside {
    background-color: v-bind(bgColor);
    font-family: "Inter", serif;
    height: 400px;
    width: 100%;

  }
</style>