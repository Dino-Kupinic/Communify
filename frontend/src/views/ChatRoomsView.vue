<script setup lang="ts">
import RoomContainer from "@/components/chatrooms/RoomContainer.vue"
import UserProfileBar from "@/components/user/UserProfileBar.vue"
import ChatRoom from "@/components/chatrooms/ChatRoom.vue"
import {onMounted, ref, reactive} from "vue"
import RoomList from "@/components/chatrooms/RoomList.vue"
import Icon from "@/components/util/Icon.vue"
import type {Room} from "@/model/types"
import TitleText from "@/components/text/TitleText.vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import {socket} from "@/socket/server"
import {useRoomStore} from "@/stores/roomStore"
import CreateRoomModal from "@/components/modals/CreateRoomModal.vue"
import Modal from "@/components/Boxes/Modal.vue"
import InputField from "@/components/controls/InputField.vue"
import BodyText from "@/components/text/BodyText.vue"
import Badge from "@/components/util/Badge.vue";
import DropDown from "@/components/util/DropDown.vue";
import {email, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {maxLength, minLength} from "@vuelidate/validators/dist/index";
import {EMAIL_MAX_LENGTH, MAX_LENGTH, PASSWORD_MIN_LENGTH} from "@/model/user_constants";
import InputError from "@/components/controls/InputError.vue";

const badges = reactive([{color: "", text: ""}])
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

/**
 * @todo make the v-model of the badge color return a string containing the color
 * or return the full array
 * @todo make create room also add the badges to the room
 */
function addBadge() {
  console.log(state.badgeColor ? state.badgeColor : "NULL");
  badges.push({color: state.badgeColor, text: state.badgeName})
}


const state = reactive({
  badgeName: "",
  badgeColor: ""
})

const rules = {
  badgeName: {
    required,
  },
  badgeColor: {
    required,
  },
}

async function submitForm() {
  const isFormCorrect = await v$.value.$validate()
  console.log("" + state.badgeColor + " | " + state.badgeName)

  if (!isFormCorrect) return


  addBadge()
}


const v$ = useVuelidate(rules, state)

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

#badge-colorpick-container {
  display: flex;
  flex-wrap: wrap;
  width: auto;
  align-content: center;

}

.input-error :deep(input) {
  border-color: var(--error-400);
}

</style>