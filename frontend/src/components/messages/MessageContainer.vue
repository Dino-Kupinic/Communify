<script setup lang="ts">
import {onMounted, provide, ref} from "vue"
import MessageText from "@/components/messages/MessageText.vue"

const props = defineProps<{
  messageType: string
  user_id?: string
}>()
provide("messageType", props.messageType)

const isFromThem: boolean = props.messageType == 'from-them'

onMounted(() => {

})
</script>

<template>
  <p v-if="isFromThem"></p>
  <MessageText>
    <slot></slot>
  </MessageText>
</template>

<style scoped>

</style>