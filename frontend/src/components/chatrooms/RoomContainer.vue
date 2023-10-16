<script setup lang="ts">
import TitleText from "@/components/text/TitleText.vue"
import {ref} from "vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import Icon from "@/components/util/Icon.vue"
import Modal from "@/components/Boxes/Modal.vue"
import Badge from "@/components/util/Badge.vue"

const props = defineProps<{
  title?: string
}>()

const badges = [
  {name: "Badge1"},
  {name: "Badge2"},
  {name: "Badge3"},
  {name: "Badge4"},
  {name: "Badge5"},
  {name: "Badge5"},
  {name: "Badge5"},
  {name: "Badge5"},
  {name: "Badge5"},
  {name: "Badge5"},
]

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
      <Modal>
        <template #modal-btn>
          <ActionButton height="max-content">
            <Icon image-name="more" file-extension="png"></Icon>
          </ActionButton>
        </template>
        <template #modal-content>
          <p id="title">
            <TitleText title="Chatroom Info"></TitleText>
          </p>
          <p>Badges</p>
          <div id="badges">
            <Badge v-for="badge in badges"> {{badge.name}} </Badge>
          </div>
        </template>
      </Modal>
    </div>
</template>

<style scoped>
#chatroom-div {
  width: 100%;
  height: 6em;
  padding: 5%;
  border-bottom: 1px solid var(--color-border-soft);
  background-color: var(--color-background);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
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