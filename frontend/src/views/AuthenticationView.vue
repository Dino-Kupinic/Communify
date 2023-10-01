<script setup lang="ts">

import Logo from "@/components/util/Logo.vue"
</script>

<template>
  <div class="content">
    <Logo class="logo"></Logo>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
}

.logo {
  margin-top: 3rem;
}
</style>