<script setup lang="ts">
import ErrorAlert from "@/components/util/ErrorAlert.vue"
import {useUserStore} from "@/stores/userStore.ts"
import {pb} from "@/db/pocketbase.ts"

const userStore = useUserStore()
userStore.currentUser = pb.authStore.model

pb.authStore.onChange((auth) => {
  console.log("authStore changed", auth)
  userStore.currentUser = pb.authStore.model
  userStore.isLoggedIn = pb.authStore.isValid
})
</script>

<template>
  <ErrorAlert/>
  <RouterView/>
</template>

