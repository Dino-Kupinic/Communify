<script setup lang="ts">
import RoomContainer from "@/components/chatrooms/RoomContainer.vue"
import UserProfileBar from "@/components/user/UserProfileBar.vue"
import ChatRoom from "@/components/chatrooms/ChatRoom.vue"
import {onMounted, ref, watch} from "vue"
import RoomList from "@/components/chatrooms/RoomList.vue"
import Icon from "@/components/util/Icon.vue"
import type {Room} from "@/model/types"
import TitleText from "@/components/text/TitleText.vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import {socket} from "@/socket/server"
import {useRoomStore} from "@/stores/roomStore"
import CreateRoomModal from "@/components/modals/CreateRoomModal.vue"
import ButtonText from "@/components/controls/ButtonText.vue"

const rooms = ref<Room[]>()
const currentRoom = ref<Room>()
const roomStore = useRoomStore()
let enteredPswd = ref()

onMounted(async () => {
  socket.connect()
  await roomStore.fetchRooms()
  rooms.value = roomStore.rooms
})

async function refreshRooms() {
  await roomStore.fetchRooms()
  rooms.value = roomStore.rooms
}

const actionButtons = ref([
  {icon: "refresh", label: "Refresh", action: refreshRooms},
  {icon: "add", label: "Create Room"},
  {icon: "account", label: "Profile"},
  {icon: "settings", label: "Settings"},
])

function joinRoom(room: Room) {
  currentRoom.value = undefined;
  currentRoom.value = roomStore.rooms.find(roomItem => {
    if (roomItem === room) {
      if (room.password === null) return roomItem.name
      if (enteredPswd.value === room.password) return roomItem.name
    }
  })

}

function updateOnRoomCreation() {
  rooms.value = roomStore.rooms
}

</script>

<template>
  <div id="site-container">
    <div id="userbar-chatrooms-container">
      <div id="userbar-container">
        <UserProfileBar id="container-div-short-user"/>
        <div id="container-div-short-menu" class="container-div-short">
          <ActionButton
            v-for="button in actionButtons"
            :key="button.label"
            :hollow="true"
            height="max-content"
            class="logout"
            @click="button.action"
          >
            <CreateRoomModal @created="updateOnRoomCreation" v-if="button.icon ==='add'"
                             modalTitle="Create Room"></CreateRoomModal>
            <template v-else>
              <Icon class="img" :image-name="button.icon" file-extension="png"/>
              <ButtonText>{{ button.label }}</ButtonText>
            </template>
          </ActionButton>
        </div>
      </div>
      <RoomList>
        <RoomContainer v-model="enteredPswd" @entered="joinRoom(room)" @refreshed="refreshRooms" @joined="joinRoom" v-if="rooms" v-for="room in rooms"
                       :room="room"></RoomContainer>
        <TitleText v-else title="Loading..."></TitleText>
      </RoomList>
    </div>
    <ChatRoom v-if="currentRoom != undefined" :room="currentRoom"></ChatRoom>
    <h2 id="no-room" v-else>✨ Join a room on the left to start chatting! ✨</h2>
  </div>
</template>

<style scoped>
#no-room {
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#userbar-container {
  border-right: 1px solid var(--color-border-soft);
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

.input-error :deep(input) {
  border-color: var(--error-400);
}

</style>