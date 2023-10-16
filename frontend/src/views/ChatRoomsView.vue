<script setup lang="ts">

import RoomContainer from "@/components/chatrooms/RoomContainer.vue"
import UserProfileBar from "@/components/user/UserProfileBar.vue"
import ChatRoom from "@/components/chatrooms/ChatRoom.vue"
import {onMounted, ref} from "vue"
import RoomList from "@/components/chatrooms/RoomList.vue"
import Icon from "@/components/util/Icon.vue"
import type {Room} from "@/model/types"
import TitleText from "@/components/text/TitleText.vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import Modal from "@/components/Boxes/Modal.vue"
import InputField from "@/components/controls/InputField.vue"

let name = ref("")
let maxUser = ref(10)
let description = ref("hallo1")
let password = ref("")
let c_ID = ref(1)

const rooms = ref<Room[]>()
const room = {
  name: name.value,
  maximum_users: maxUser.value,
  description: description.value,
  password: password.value,
  creator_id: c_ID.value,
}

onMounted(async () => {
  await loadRooms()
})

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

async function createRoom() {
  try {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    })
  } catch (err) {
    console.error(err)
  }
}

let isPrivateRoom = ref<boolean>(false)

const actionButtons = ref([
  {icon: "refresh", label: "Refresh", action: loadRooms},
  {icon: "add", label: "Create Room"},
  {icon: "account", label: "Profile"},
  {icon: "settings", label: "Settings"},
])

function reverseDisplay(name: string) {
  isPrivateRoom.value = name === "private"
}

</script>

<template>
  <div id="site-container">
    <div id="userbar-chatrooms-container">
      <div id="userbar-container">
        <!-- Bar for the user profile on top of the list -->
        <UserProfileBar id="container-div-short-user"/>
        <!-- Bar for the menu above the list and under the user-bar -->
        <div id="container-div-short-menu" class="container-div-short">
          <ActionButton
            v-for="button in actionButtons"
            :key="button.label"
            :hollow="true"
            height="max-content"
            class="logout"
            @click="button.action"
          >
            <Modal modalTitle="Create Room">
              <template #modal-btn>
                <Icon class="img" :image-name="button.icon" file-extension="png"/>
                <span class="btn-span">{{ button.label }}</span>
              </template>
              <template #modal-content>
                <InputField :model-value=name label="Enter a Name for your Room"></InputField>
                <!-- Private/Public Room Selection -->
                <div id="selection-container-div">
                  <div class="selection-div">
                    <input @click="reverseDisplay('public')" class="selection-input" type="radio"
                           name="chatroom-status" id="public">
                    <label class="selection-label" for="private">Public chat room</label>
                  </div>
                  <div class="selection-div">
                    <input @click="reverseDisplay('private')" class="selection-input" type="radio"
                           name="chatroom-status" id="private">
                    <label class="selection-label" for="public">Private chat room</label>
                    <InputField v-if="isPrivateRoom" model-value="" label="Password" type="password"></InputField>
                  </div>
                </div>
              </template>
              <template #second-btn>
                <span @click="" id="save-btn">Save</span>
              </template>
            </Modal>
          </ActionButton>
        </div>
      </div>

      <RoomList>
        <RoomContainer v-if="rooms" v-for="room in rooms" :title="room.name"></RoomContainer>
        <TitleText v-else title="Loading..."></TitleText>
        <Modal></Modal>
      </RoomList>
    </div>
    <!--    <ChatRoom></ChatRoom>-->
  </div>
</template>

<style scoped>
#userbar-container {
  border-right: 1px solid var(--color-border-very-soft);
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

#site-container {
  display: flex;
}

#userbar-chatrooms-container {
  width: 25%;
}

#container-div-short-menu {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: 4vh;
}

.logout {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 1rem;
  padding-right: 1.5%;
  padding-left: 1.5%;
}

.container-div-short {
  width: 100%;
  height: 8vh;
  background-color: var(--color-background);
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--color-border-soft);
}

.img {
  margin-right: 0.1rem;
}

.btn-span {
  padding-top: 3%;
}

#selection-container-div {
  display: block;
}

.selection-div {
  margin-top: 5%;
  padding-bottom: 1%;
  padding-left: 1%;
}

.selection-input {
  margin-right: 1%;
}

.selection-label {
  font-size: 1.2rem;
}

#save-btn {
  font-weight: bold;
}


</style>