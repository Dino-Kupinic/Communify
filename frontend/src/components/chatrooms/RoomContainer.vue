<script setup lang="ts">
import TitleText from "@/components/text/TitleText.vue"
import {onMounted, ref, watch} from "vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import Icon from "@/components/util/Icon.vue"
import Modal from "@/components/Boxes/Modal.vue"
import Badge from "@/components/util/Badge.vue"
import type {Room, Topic} from "@/model/types"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import BodyText from "@/components/text/BodyText.vue"
import ModalSubText from "@/components/text/ModalSubText.vue"

const props = defineProps<{
  title?: string
  room_id: number | null;
}>()

let badges = ref<Topic[]>()


onMounted(() => {
  loadRooms()
  loadBadges()
})

async function loadBadges() {
  try {
    const response = await fetch("http://localhost:4000/topic/getTopicsByRoomId/"+props.room_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    badges.value = await response.json()
  } catch (err) {
    console.log(err)
  }
}
const rooms = ref<Room[]>()

const buttonStyle = ref("unclickedBtn")

async function loadRooms() {
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

    await loadRooms()

  } catch (err) {
    console.error(err)
  }
}


</script>

<template>
  <div id="chatroom-div" :class="buttonStyle">
    <TitleText :title="title"></TitleText>
    <Modal>
      <template #modal-btn>
        <Icon class="details" image-name="more" file-extension="png"></Icon>
      </template>
      <template #modal-content>
        <p id="title">
          <TitleText title="Chatroom Info"></TitleText>
        </p>
        <div class="subtheme-container">
          <ModalSubText title="Badges"></ModalSubText>
          <div id="badges">
            <Badge v-for="badge in badges" :color="badge.color"> {{ badge.text }}</Badge>
          </div>
        </div>
        <div class="subtheme-container">
          <ModalSubText title="Description"></ModalSubText>
          <div v-for="room in rooms">
            <p v-if="room.room_id === props.room_id">{{ room.description }}</p>
          </div>
        </div>

      </template>
      <template #second-btn>
        <span @click="deleteRoom" id="delete-btn">Delete</span>
      </template>
    </Modal>
    <div id="badges-div">
      <Badge v-for="badge in badges" id="badge" :color="badge.color"> {{ badge.text }}</Badge>
    </div>
    <div class="join-button-div">
      <div id="lock-div" v-for="room in rooms">
        <Icon v-if="room.password !== null && room.room_id === room_id" image-name="locked" file-extension="png"></Icon>
      </div>
      <ActionButton class="join-button" width="5rem">
        <GoogleIcon padding="0" name="Arrow_right"></GoogleIcon>
        <BodyText class="join-text">Join</BodyText>
      </ActionButton>
    </div>
  </div>
</template>

<style scoped>
.join-button-div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.join-text {
  margin-top: 0.2rem;
}

:deep(.join-button) {
  background-color: var(--warning-300);
  color: var(--warning-700);
  border: 1px solid var(--warning-700);
  margin-left: auto;
}

:deep(.join-button:hover) {
  background-color: var(--warning-400);
  color: var(--warning-800);
  border: 1px solid var(--warning-800);
}

.join-text {
  color: var(--warning-800);
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

.subtheme-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

#lock-div {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

#badges-div {
  width: 100%;
}


</style>