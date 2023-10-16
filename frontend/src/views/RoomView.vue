<script setup lang="ts">

import RoomContainer from "@/components/chatrooms/RoomContainer.vue"
import UserProfileBar from "@/components/user/UserProfileBar.vue"
import ChatRoom from "@/components/chatrooms/ChatRoom.vue"
import UserIcon from "@/components/user/UserIcon.vue"
import UserProfileText from "@/components/user/UserProfileText.vue"
import {onMounted, ref} from "vue"
import RoomList from "@/components/chatrooms/RoomList.vue"
import Icon from "@/components/util/Icon.vue"
import type {Room} from "@/model/types"
import TitleText from "@/components/text/TitleText.vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import Modal from "@/components/Boxes/Modal.vue"
import InputField from "@/components/controls/InputField.vue"

let username = ref("Neuery17")
let rooms = ref<Room[]>()

let privateRoom = ref(false)

onMounted(async () => {
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
})

function reversePswdDisplay (name : string) {
  privateRoom.value = name === "private";
}

</script>

<template>
  <div id="site-container">
    <div id="userbar-chatrooms-container">
      <div id="userbar-container">
        <!-- Bar for the user profile on top of the list -->
        <UserProfileBar id="container-div-short-user">
          <div id="icon-container">
            <UserIcon initials="DK"></UserIcon>
          </div>

          <UserProfileText id="username">
            {{ username }}
          </UserProfileText>
        </UserProfileBar>

        <!-- Bar for the menu above the list and under the user-bar -->
        <UserProfileBar id="container-div-short-menu">
          <ActionButton height="max-content" id="refresh">
              <Icon id="ref-img" image-name="refresh" file-extension="png"></Icon>
              <span id="ref-span">
                 Refresh
              </span>
          </ActionButton>
          <ActionButton height="max-content">
            <Icon image-name="account" file-extension="png"></Icon>
          </ActionButton>
          <Modal modalTitle="Create Room">
            <template #modal-btn>
              <ActionButton height="max-content">
                <Icon image-name="add" file-extension="png"></Icon>
              </ActionButton>
            </template>
            <template #modal-content>
              <InputField model-value="" label="Enter a Name for your Room"></InputField>
              <!-- Private/Public Room Selection -->
              <div id="selection-container-div">
                <div class="selection-div">
                  <input @click="reversePswdDisplay('public')" class="selection-input" type="radio" name="chatroom-status" id="public">
                  <label class="selection-label" for="private">Public chat room</label>
                </div>
                <div class="selection-div">
                  <input @click="reversePswdDisplay('private')" class="selection-input" type="radio" name="chatroom-status" id="private">
                  <label class="selection-label" for="public">Private chat room</label>
                  <InputField v-if="privateRoom" model-value="" label="Password" type="password"></InputField>
                </div>
              </div>
            </template>
            <template #second-btn>
              <span id="save-btn">Save</span>
            </template>
          </Modal>
          <ActionButton height="max-content">
            <Icon image-name="settings" file-extension="png"></Icon>
          </ActionButton>
        </UserProfileBar>
      </div>

      <RoomList>
        <RoomContainer v-if="rooms" v-for="room in rooms" :title="room.name"></RoomContainer>
        <TitleText v-else title="Loading..."></TitleText>

        <Modal></Modal>
      </RoomList>
    </div>
    <ChatRoom></ChatRoom>
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

.container-div-short {
  width: 100%;
  height: 6em;
  background-color: var(--color-background);
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--color-border-soft);
}

#username {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

#container-div-short-menu {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: auto;
}

#icon-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}

#refresh {
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
  padding-right: 1.5%;
  padding-left: 1.5%;
  height: -webkit-fill-available
}

#ref-img {
  margin-right: 0.3rem;
}

#ref-span {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
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