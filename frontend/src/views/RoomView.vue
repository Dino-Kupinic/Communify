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

let username = ref("Neuery17")
let rooms = ref<Room[]>()

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

</script>

<template>
  <div id="site-container">
    <div id="userbar-chatrooms-container">
      <div id="userbar-container">
        <!-- Bar for the user profile on top of the list -->
        <UserProfileBar id="container-div-short-user">
          <UserIcon initials="DK"></UserIcon>
          <UserProfileText id="username">
            {{ username }}
          </UserProfileText>
        </UserProfileBar>

        <!-- Bar for the menu above the list and under the user-bar -->
        <UserProfileBar id="container-div-short-menu">
          <Icon image-name="account" file-extension="png"></Icon>
          <Icon image-name="add" file-extension="png"></Icon>
          <Icon image-name="settings" file-extension="png"></Icon>
        </UserProfileBar>
      </div>

      <RoomList>
        <RoomContainer v-if="rooms" v-for="room in rooms" :title="room.name"></RoomContainer>
        <TitleText v-else title="Loading..."></TitleText>
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

</style>