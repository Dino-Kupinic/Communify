<script setup lang="ts">
import {
  AlertDialog, AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {useErrorStore} from "@/stores/error.ts"
import {storeToRefs} from "pinia"
import {ref, watch} from "vue"

const {errorMessage, hint} = storeToRefs(useErrorStore())
const errorStore = useErrorStore()
const openModal = ref<boolean>(false)

watch(errorMessage, () => {
  openModal.value = errorMessage.value != ""
})
</script>

<template>
  <AlertDialog v-model:open="openModal">
    <AlertDialogContent>
      <AlertDialogTitle>Oops... Something went wrong</AlertDialogTitle>
      <AlertDialogDescription>
        <Alert variant="destructive">
          <v-icon name="io-alert-circle"></v-icon>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {{ errorMessage }}
          </AlertDescription>
        </Alert>
      </AlertDialogDescription>
      <p>{{ hint != "" ? hint : "No futher details provided." }}</p>
      <AlertDialogFooter>
        <AlertDialogAction @click="errorStore.clear()" class="sm:w-32 sm:m-auto">Ok</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>