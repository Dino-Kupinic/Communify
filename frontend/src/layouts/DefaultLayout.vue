<script setup lang="ts">
import TheFooter from "@/components/footer/TheFooter.vue"
import TheNavigationBar from "@/components/nav/TheNavigationBar.vue"
</script>

<template>
  <TheNavigationBar/>
  <RouterView class="pb-24"/>
  <TheFooter/>
</template>
