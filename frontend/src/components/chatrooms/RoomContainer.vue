<script setup lang="ts">
import TitleText from "@/components/text/TitleText.vue"
import {onMounted, ref} from "vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import Icon from "@/components/util/Icon.vue"
import Modal from "@/components/Boxes/Modal.vue"
import Badge from "@/components/util/Badge.vue"
import {Room} from "@/model/types"

const props = defineProps<{
  title?: string
  room_id: number|null;
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

const rooms = ref<Room[]>()
const buttonStyle = ref('unclicked')

async function deleteRoom() {
  try {
    const response = await fetch("http://localhost:4000/room/deleteRoomById/"+props.room_id, {
      method: "DELETE",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
  } catch (err) {
    console.error(err)
  }
}

onMounted (() => {
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
        <template #second-btn>
          <span @click="deleteRoom" id="delete-btn">Delete</span>
        </template>
      </Modal>
    </div>
  </div>
</template>

<style scoped>
#chatroom-div {
  width: 100%;
  height: 6em;
  padding: 5%;
  border-bottom: 1px solid var(--color-border-soft);
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