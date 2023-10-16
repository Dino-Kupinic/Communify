<script setup lang="ts">
import TitleText from "@/components/text/TitleText.vue"
import {ref} from "vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import Icon from "@/components/util/Icon.vue"
import Modal from "@/components/Boxes/Modal.vue"
import Badge from "@/components/util/Badge.vue"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import BodyText from "@/components/text/BodyText.vue"

const props = defineProps<{
  title?: string
}>()

const badges = [
  {name: "Programming"},
  {name: "Cooking"},
  {name: "Just chilling"},
  {name: "Gaming"},
  {name: "Software Development"},
]

const buttonStyle = ref("unclickedBtn")

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
    <Modal>
      <template #modal-btn>
        <Icon class="details" image-name="more" file-extension="png"></Icon>
      </template>
      <template #modal-content>
        <p id="title">
          <TitleText title="Chatroom Info"></TitleText>
        </p>
        <p>Badges</p>
        <div id="badges">
          <Badge v-for="badge in badges"> {{ badge.name }}</Badge>
        </div>
      </template>
    </Modal>
    <div>
      <Badge v-for="badge in badges"> {{ badge.name }}</Badge>
    </div>
    <ActionButton class="join-button" width="5rem">
      <GoogleIcon padding="0" name="Arrow_right"></GoogleIcon>
      <BodyText class="join-text" >Join</BodyText>
    </ActionButton>
  </div>
</template>

<style scoped>
.join-text {
  margin-top: 0.2rem;
}

:deep(.join-button) {
  background-color: var(--warning-300);
  color: var(--warning-700);
  border: 1px solid var(--warning-700);
}

:deep(.join-button:hover) {
  background-color: var(--warning-400);
  color: var(--warning-800);
  border: 1px solid var(--warning-800);
}

#chatroom-div {
  width: 100%;
  height: 10em;
  padding: 5%;
  border-bottom: 1px solid var(--color-border-soft);
  background-color: var(--color-background);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.details {
  margin-left: 0.5em;
  cursor: pointer;
}

#chatroom-div:hover {
  background-color: var(--color-background-soft);
}

#title {
  font-size: 3rem;
}

#badges {
  display: flex;
  flex-wrap: wrap;
  overflow-x: unset;
}


</style>