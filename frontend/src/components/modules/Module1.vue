<script setup lang="ts">
interface Props {
  bgColor?: string
  textColor?: string
}

withDefaults(defineProps<Props>(), {
  bgColor: "var(red)",
  textColor: "var(red)",
})
</script>

<template>
  <h2>
    <slot>
    </slot>
  </h2>
</template>

<style scoped>
h2 {
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: 400px;
  width: 50%;
  margin-right: 10px;
  margin-top: 20px;
  background-color: v-bind(bgColor);
  color: v-bind(textColor);
}
</style>