<script setup lang="ts">
import TitleText from "@/components/text/TitleText.vue"
import {onMounted, ref} from "vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import Icon from "@/components/util/Icon.vue"
import Modal from "@/components/Boxes/Modal.vue"
import Badge from "@/components/util/Badge.vue"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import BodyText from "@/components/text/BodyText.vue"
import {Room} from "@/model/types"

const props = defineProps<{
  title?: string
  room_id: number | null;
}>()

const badges = [
  {name: "Programming"},
  {name: "Cooking"},
  {name: "Just chilling"},
  {name: "Gaming"},
  {name: "Software Development"},
]

const rooms = ref<Room[]>()
const buttonStyle = ref('unclicked')

async function deleteRoom() {
  try {
    const response = await fetch("http://localhost:4000/room/deleteRoomById/" + props.room_id, {
      method: "DELETE",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  getRooms()
})

async function getRooms() {
  try {
    const response = await fetch("http://localhost:4000/room/getRooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    rooms.value = await response.json()
  } catch (err) {
    console.error(err)
  }
}

// Trying to make only one colorable


async function getMessages() {
  changeCol()
  console.log("getMessages()")
}

function changeCol() {
  console.log("changeCol()")
  if (buttonStyle.value === "clicked") {
    buttonStyle.value = "unclicked"
  } else {
    buttonStyle.value = "clicked"
  }
}

</script>

<template>
  <div :id="buttonStyle">
    <div id="chatroom-div" @click="getMessages">
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
        <template #second-btn>
          <span @click="deleteRoom" id="delete-btn">Delete</span>
        </template>
      </Modal>
      <div>
        <Badge v-for="badge in badges"> {{ badge.name }}</Badge>
      </div>
      <div class="join-button-div">
        <ActionButton class="join-button" width="5rem">
          <GoogleIcon padding="0" name="Arrow_right"></GoogleIcon>
          <BodyText class="join-text">Join</BodyText>
        </ActionButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.join-button-div {
  width: 100%;
}

.join-text {
  margin-top: 0.2rem;
}

:deep(.join-button) {
  background-color: var(--warning-300);
  color: var(--warning-700);
  border: 1px solid var(--warning-700);
  float: right;
}

:deep(.join-button:hover) {
  background-color: var(--warning-400);
  color: var(--warning-800);
  border: 1px solid var(--warning-800);
}

.join-text {
  color: var(--warning-800);
}

.details {
  padding-left: 0.5%;
  cursor: pointer;
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

#delete-btn {
  font-weight: bold;
}

#clicked {
  background-color: var(--color-background-very-soft);
}

#unclicked {
  background-color: var(--color-background);
}


</style>