<script setup lang="ts">

import RoomContainer from "@/components/chatrooms/RoomContainer.vue"
import UserProfileBar from "@/components/user/UserProfileBar.vue"
import ChatRoom from "@/components/chatrooms/ChatRoom.vue"
import {onMounted, ref, reactive, watch} from "vue"
import RoomList from "@/components/chatrooms/RoomList.vue"
import Icon from "@/components/util/Icon.vue"
import type {Room, Topic} from "@/model/types"
import TitleText from "@/components/text/TitleText.vue"
import ActionButton from "@/components/controls/ActionButton.vue"
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

let name = ref("")
let maxUser = ref(10)
let description = ref("")
let password = ref("")
let c_ID = ref(1)
let isClicked = ref("clicked")

const badges = reactive([{color: "", text: ""}])
const rooms = ref<Room[]>()
const hexColors = ["Red", "Blue", "Green", "Yellow", "Purple", "Teal", "Orange", "Brown"]

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
  const room = {
    name: name.value,
    maximum_users: maxUser.value,
    description: description.value,
    password: isPrivateRoom.value ? password.value : "",
    creator_id: c_ID.value,
  }

  setValuesDefault()

  try {
    const response = await fetch("http://localhost:4000/room/createRoom", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    })
    await loadRooms();
  } catch (err) {
    console.error(err)
  }

}

function setValuesDefault() {
  const radBtn = document.getElementById("public") as HTMLInputElement

  name.value = ""
  maxUser.value = 10
  description.value = ""
  password.value = ""
  isPrivateRoom.value = false
  radBtn.checked = true
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
            <Modal v-if="button.icon==='add'" modalTitle="Create Room">
              <template #modal-btn>
                <Icon class="img" :image-name="button.icon" file-extension="png"/>
                <BodyText class="btn-span">{{ button.label }}</BodyText>
              </template>
              <template #modal-content>
                <InputField placeholder="Room Name" v-model="name" label="Enter a Name for your Room"></InputField>
                <InputField placeholder="Description" v-model="description" label="Description"></InputField>
                <InputField placeholder="Max. User" v-model="maxUser" label="Max. User" id="max-user-input"
                            type="number" value="10" min="1" max="10"></InputField>
                <div id="badge-colorpick-container">
                  <InputField :class="{'input-error': v$.badgeName.$error}" placeholder="Badge Name" v-model="state.badgeName" label="Add Badges">
                    <template #below-input>
                    </template>
                  </InputField>
                  <DropDown label="Badge Color" :class="{'input-error': v$.badgeColor.$error}" v-model="state.badgeColor" type="ColorPicker" :list-elements="hexColors"></DropDown>
                  <ActionButton @click="submitForm" width="max-content" height="max-content">
                    <Icon image-name="add" file-extension="png"></Icon>
                  </ActionButton>
                </div>
                <div>
                  <Badge v-for="badge in badges" :color="badge.color">{{ badge.text }}</Badge>
                </div>
                <!-- Private/Public Room Selection -->
                <div id="selection-container-div">
                  <div class="selection-div">
                    <input @click="reverseDisplay('public')" class="selection-input" type="radio"
                           name="chatroom-status" checked="checked" id="public">
                    <label class="selection-label" for="private">Public chat room</label>
                  </div>
                  <div class="selection-div">
                    <input @click="reverseDisplay('private')" class="selection-input" type="radio"
                           name="chatroom-status" id="private">
                    <label class="selection-label" for="public">Private chat room</label>
                    <InputField v-if="isPrivateRoom" v-model="password" label="Password" type="password"></InputField>
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
        <RoomContainer v-if="rooms" v-for="room in rooms" :title="room.name"
                       :room_id="room.room_id"></RoomContainer>
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