<script setup lang="ts">
import RoomContainer from "@/components/chatrooms/RoomContainer.vue"
import UserProfileBar from "@/components/user/UserProfileBar.vue"
import ChatRoom from "@/components/chatrooms/ChatRoom.vue"
import {onMounted, reactive, ref} from "vue"
import RoomList from "@/components/chatrooms/RoomList.vue"
import Icon from "@/components/util/Icon.vue"
import type {Client, Room} from "@/model/types"
import TitleText from "@/components/text/TitleText.vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import Modal from "@/components/Boxes/Modal.vue"
import InputField from "@/components/controls/InputField.vue"
import BodyText from "@/components/text/BodyText.vue"
import {socket} from "@/socket/server"
import {useRoomStore} from "@/stores/roomStore"
import {maxLength, maxValue, minValue, required} from "@vuelidate/validators"
import {
  DESCRIPTION_MAX_LENGTH,
  MAXIMUM_USERS,
  MINIMUM_USERS,
  ROOM_NAME_MAX_LENGTH, ROOM_PASSWORD_MAX_LENGTH,
} from "@/model/type_constants"
import useVuelidate from "@vuelidate/core"
import {fetchData} from "@/model/util-functions"

const initialState: Room = reactive({
  room_id: null,
  name: "",
  maximum_users: null,
  description: null,
  password: null,
  creator_id: 0,
})

const state = reactive<Room>({...initialState})

const rules = {
  name: {
    required,
    maxLength: maxLength(ROOM_NAME_MAX_LENGTH),
  },
  maximum_users: {
    minValue: minValue(MINIMUM_USERS),
    maxValue: maxValue(MAXIMUM_USERS),
  },
  description: {
    maxLength: maxLength(DESCRIPTION_MAX_LENGTH),
  },
  password: {
    maxLength: maxLength(ROOM_PASSWORD_MAX_LENGTH),
  },
}

const v$ = useVuelidate(rules, state)

function resetState() {
  Object.assign(state, initialState)
}

async function getCurrentUserId(): Promise<number> {
  const token = localStorage.getItem("auth_token")
  if (token) {
    const client: Client = await fetchData("http://localhost:4000/auth/profile", "GET", [["access_token", token]])
    return client.user_id as number
  }
  throw new Error("User not authorized")
}

const rooms = ref<Room[]>()
const roomStore = useRoomStore()

onMounted(async () => {
  socket.connect()
  await roomStore.fetchRooms()
  rooms.value = roomStore.rooms
})

async function createRoom() {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  const creator_id = await getCurrentUserId()
  const room: Room = {
    room_id: null,
    name: state.name,
    maximum_users: state.maximum_users,
    description: state.description,
    password: state.password,
    creator_id: creator_id,
  }

  try {
    await roomStore.addRoom(room)
    rooms.value = roomStore.rooms
    resetState()
  } catch (err) {
    console.error(err)
  }
}

let isPrivateRoom = ref<boolean>(false)

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

function reverseDisplay(name: string) {
  isPrivateRoom.value = name === "private"
}

function joinRoom(room: string) {
  console.log(room)
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
            <Modal v-if="button.icon ==='add'" modalTitle="Create Room">
              <template #modal-btn>
                <Icon class="img" :image-name="button.icon" file-extension="png"/>
                <BodyText class="btn-span">{{ button.label }}</BodyText>
              </template>
              <template #modal-content>
                <InputField v-model="state.name" label="Enter a Name for your Room"></InputField>
                <InputField v-model="state.description" label="Description"></InputField>
                <InputField v-model="state.maximum_users" label="Max. User" id="max-user-input" type="number" value="1"
                            min="1"></InputField>
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
                    <InputField v-if="isPrivateRoom" v-model="state.password" label="Password"
                                type="password"></InputField>
                  </div>
                </div>
              </template>
              <template #second-btn>
                <span @click="createRoom" id="save-btn">Save</span>
              </template>
            </Modal>
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

#selection-container-div {
  display: block;
  margin-bottom: 5%;
}

.selection-div {
  margin-top: 5%;
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

#max-user-input {
  width: 50%;
}


</style>