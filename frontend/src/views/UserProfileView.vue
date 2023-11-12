<script setup lang="ts">

import InputField from "@/components/controls/InputField.vue"
import {BACKEND_URL} from "@/socket/server"
import type {Client, Room} from "@/model/types"
import Badge from "@/components/util/Badge.vue"
import {fetchData} from "@/model/util-functions"
import {markRaw, onMounted, ref} from "vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import router from "@/router/router"
import WindowTitleText from "@/components/text/WindowTitleText.vue"
import HorizontalContainer from "@/components/util/HorizontalContainer.vue"
import UserIcon from "@/components/user/UserIcon.vue"
import VerticalContainer from "@/components/util/VerticalContainer.vue"
import Spinner from "@/components/util/Spinner.vue"
import Accordion from "@/components/util/Accordion.vue"
import {useRoomStore} from "@/stores/roomStore"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import Link from "@/components/text/Link.vue"
import BodyText from "@/components/text/BodyText.vue"

const token = ref<string>(localStorage.getItem("auth_token") || "")
const currClient = ref<Client>()
let roomsByUser = ref<Room[]>([])
let roomStore = useRoomStore()
let memberSince = ref()

onMounted(async () => {
  await getProfile()
  await getAllRoomsByUser()
  formatDate()
})

async function getProfile() {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "access_token": token.value,
      },
    })
    currClient.value = await response.json()
  } catch (err) {
    console.error(err)
  }
}

async function getAllRoomsByUser() {
  try {
    const response: Room[] = await fetchData(`${BACKEND_URL}/room/getRooms`,
      "GET", [["Content-Type", "application/json"]])

    if (response) {
      response.forEach((room) => room.creator_id === currClient?.value?.user_id ? roomsByUser.value.push(room) : "")
    }
  } catch (err) {
    console.error(err)
  }
}

async function deleteRoom(id: number | null) {
  const newRooms: Room[] = []
  if (id) {
    await roomStore.deleteRoom(id)
    await roomStore.fetchRooms()
    let rooms = roomStore.rooms
    rooms.forEach((room) => {
      if (room.creator_id === currClient.value?.user_id) {
        newRooms.push(room)
      }
    })
    roomsByUser.value = newRooms
  }
}

function formatDate(): string {
  memberSince.value = currClient.value?.member_since

  let rslt = memberSince.value.replace(/T/g, " ")
  rslt = rslt.replace(/Z/g, "")
  rslt = rslt.replaceAll("-", ".")
  const dateTime = rslt.split(" ")
  if (dateTime) {
    const splitTime = dateTime[0].split(".")
    return `${splitTime[2]}.${splitTime[1]}.${splitTime[0]}`
  } else {
    return ""
  }
}

</script>

<template>
  <div id="spinner-div" v-if="!currClient">
    <Spinner></Spinner>
  </div>
  <VerticalContainer v-else>
    <HorizontalContainer id="horizontal-container">
      <UserIcon id="userIcon" :initials="currClient?.username[0].toUpperCase()"></UserIcon>
      <WindowTitleText id="title" title="Account-Settings"></WindowTitleText>
      <ActionButton id="back-Button" @click="router.push('/chats')">Back</ActionButton>
    </HorizontalContainer>
    <VerticalContainer id="vertical-container">
      <Accordion accord-header-text="Private Information">
        <template #accordion-content>
          <InputField width="50%" :model-value="currClient?.email" label="Your Email-Adress"></InputField>
          <InputField class="lastInput" width="50%" model-value="Due to security reasons we can't display the password"
                      label="Your Password"></InputField>
          <BodyText class="reset-text">
            Forgot your Password?
            <Link @click="router.push('/auth/recovery')">
              <span>
                Reset it<GoogleIcon name="North_East" font-size="1.1rem" line-height="1.3"></GoogleIcon>
              </span>
            </Link>
          </BodyText>
        </template>
      </Accordion>
      <Accordion accord-header-text="Public Information">
        <template #accordion-content>
          <HorizontalContainer id="second-hor-container">
            <VerticalContainer width="50%">
              <InputField width="100%" :model-value="currClient?.username" label="Your Username"></InputField>
              <InputField width="100%" :model-value="currClient?.age" label="Your Age"></InputField>
              <InputField width="100%" :model-value="formatDate()" label="Member since"></InputField>
              <InputField class="lastInput" width="100%" :model-value="currClient?.biography"
                          label="Biography"></InputField>
            </VerticalContainer>
            <VerticalContainer container-title="My Rooms" width="49%" id="second-vert-container">
              <div id="badge-container" v-for="room in roomsByUser">
                <div id="badge">
                  <div id="room-name-div">{{ room.name }}</div>
                  <ActionButton id="del-button" @click="deleteRoom(room.room_id)">Del</ActionButton>
                </div>
              </div>
            </VerticalContainer>
          </HorizontalContainer>
        </template>
      </Accordion>
    </VerticalContainer>
  </VerticalContainer>


</template>

<style scoped>
#spinner-div {
  margin-left: 50%;
  margin-top: 10%;
  margin-bottom: 10%;
}

#horizontal-container {
  justify-content: center;
  border-bottom: 1px solid var(--color-border-soft);
  padding: 1%;
  margin-bottom: 1%;
}

#vertical-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

#userIcon {
  margin-right: auto;
}

#back-Button {
  margin-left: auto;
}

#title {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

#badge {
  border: 1px solid var(--color-border-soft);
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 1%;
  display: flex;
}


#second-vert-container {
  overflow-y: scroll;
  border: 1px solid var(--color-border-soft);
  border-radius: 1rem 0.5rem 0.5rem 1rem;
  margin-top: auto;
  margin-bottom: auto;
  height: 310px;
  padding-right: 0;
  margin-left: 4%;
  width: 450px;
}

.lastInput {
  padding-bottom: 1rem;
}

#del-button {
  margin-left: auto;
}

#room-name-div {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

.reset-text {
  padding-left: 1.5rem;
  padding-bottom: 1rem;
}

</style>