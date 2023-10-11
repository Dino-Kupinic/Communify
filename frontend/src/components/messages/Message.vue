<script setup lang="ts">
import {onMounted, ref} from "vue"

const props = defineProps<{
  messageType?: String;
  messageText?: String;
}>()

const messageStyle = ref("")

onMounted(() => {
  if (props.messageType === "received") {
    messageStyle.value = "receivedMessage"
  } else {
    messageStyle.value = "sentMessage"
  }
})

</script>

<template>
  <div class="message" :id=messageStyle>
    {{ messageText }}
  </div>


</template>

<style scoped>

.message {
  max-width: 80%;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 0.6rem;
  border-radius: 1rem;
  width: max-content;
  margin-bottom: 1rem;
}

#sentMessage {
  background-color: var(--brand-400);
  color: white;
  margin-left: auto;
}

#receivedMessage {
  background-color: var(--neutral-50);
  color: var(--neutral-1000);
}

.message-container {
  width: 100%;
}




</style>