<script setup lang="ts">

import {Button} from "@/components/ui/button"
</script>

<template>
  <div class="text-center h-screen w-full mt-20">
    <p class="text-7xl font-bold text-primary p-5">404</p>
    <p class="text-lg">We can't find what you are looking for!</p>
    <RouterLink to="/">
      <Button class="mt-5 w-1/2 sm:w-24">Home</Button>
    </RouterLink>
  </div>
</template>

