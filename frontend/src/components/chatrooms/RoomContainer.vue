<script setup lang="ts">
import TitleText from "@/components/text/TitleText.vue"
import {ref} from "vue"

const props = defineProps<{
  title?: string
}>()

const buttonStyle = ref('unclickedBtn')

function changeCol() {
  if (buttonStyle.value === "clickedBtn") {
    buttonStyle.value = "unclickedBtn"
  } else {
    buttonStyle.value = "clickedBtn"
  }
}

</script>

<template>
    <div id="chatroom-div" :class="buttonStyle" @click="changeCol()">
      <TitleText :title="title"></TitleText>
    </div>
</template>

<style scoped>
#chatroom-div {
  width: 100%;
  height: 6em;
  padding: 5%;
  border-bottom: 1px solid var(--color-border-soft);
  background-color: var(--color-background);
}

.clickedBtn {
  background-color: var(--brand-600);
}

.unclickedBtn {
  background-color: var(--neutral-900);
}


</style>