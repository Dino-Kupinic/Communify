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
import {socket} from "@/socket/server"
import {useRoomStore} from "@/stores/roomStore"
import CreateRoomModal from "@/components/modals/CreateRoomModal.vue"

const rooms = ref<Room[]>()
const roomStore = useRoomStore()

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

function joinRoom(room: string) {
  console.log(room)
}

function updateOnRoomCreation() {
  rooms.value = roomStore.rooms
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
            <CreateRoomModal @created="updateOnRoomCreation" v-if="button.icon ==='add'" modalTitle="Create Room"></CreateRoomModal>
            <template v-else>
              <Icon class="img" :image-name="button.icon" file-extension="png"/>
              <span class="btn-span">{{ button.label }}</span>
            </template>
          </ActionButton>
        </div>
      </div>
      <RoomList>
        <RoomContainer @joined="joinRoom" v-if="rooms" v-for="room in rooms" :room="room"></RoomContainer>
        <TitleText v-else title="Loading..."></TitleText>
      </RoomList>
    </div>
    <ChatRoom></ChatRoom>
  </div>
</template>

<style scoped>
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

.btn-span {
  padding-top: 1%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

</style>