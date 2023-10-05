<script setup lang="ts">

import RoomsList from "@/components/chatrooms/RoomsList.vue"
import UserProfileBar from "@/components/user/UserProfileBar.vue"
import ChatRoom from "@/components/chatrooms/ChatRoom.vue"
import UserIcon from "@/components/user/UserIcon.vue"
import UserProfileText from "@/components/user/UserProfileText.vue"
import {onMounted, ref, watch} from "vue"
import MenuIcon from "@/components/user-menu/MenuIcon.vue"

const props = defineProps<{
  username?: String
}>()

let addIcon = ref("src/assets/img/menu-icons/lightmode/add-icon/icons8-add-30.png")
let userIcon = ref("src/assets/img/menu-icons/lightmode/account-icon/icons8-test-account-30.png")
let settingsIcon = ref("src/assets/img/menu-icons/lightmode/settings-icon/icons8-support-30.png")

let username = ref("Neuery17")


window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change',({ matches }) => {
    changeTheme(matches)
  })

function changeTheme (media : Boolean) {
  if (media) {
    addIcon.value = "src/assets/img/menu-icons/darkmode/add-icon/icons8-add-30.png"
    userIcon.value = "src/assets/img/menu-icons/darkmode/account-icon/icons8-test-account-30.png"
    settingsIcon.value = "src/assets/img/menu-icons/darkmode/settings-icon/icons8-support-30.png"
  } else {
    addIcon.value = "src/assets/img/menu-icons/lightmode/add-icon/icons8-add-30.png"
    userIcon.value = "src/assets/img/menu-icons/lightmode/account-icon/icons8-test-account-30.png"
    settingsIcon.value = "src/assets/img/menu-icons/lightmode/settings-icon/icons8-support-30.png"
  }
}

onMounted(() => {
  changeTheme(!!window.matchMedia('(prefers-color-scheme: dark)'))
})

</script>

<template>
  <div id="site-container">
    <div id="userbar-chatrooms-container">
      <div id="userbar-container">
        <!-- Bar for the user profile on top of the list -->
        <UserProfileBar  id="container-div-short-user" >
            <UserIcon imgPath="src/assets/img/github.svg"></UserIcon>
            <UserProfileText id="username">
              {{ username }}
            </UserProfileText>
        </UserProfileBar>

        <!-- Bar for the menu above the list and under the user-bar -->
        <UserProfileBar id="container-div-short-menu">
            <MenuIcon class="menu-icons" id="user-btn"
                      :imgPath=userIcon></MenuIcon>
            <MenuIcon class="menu-icons" id="add-chatroom-btn"
                      :imgPath=addIcon></MenuIcon>
            <MenuIcon class="menu-icons" id="settings-btn"
                      :imgPath=settingsIcon></MenuIcon>
        </UserProfileBar>
      </div>

      <div id="chatrooms-container">
        <RoomsList title="Hallo1"></RoomsList>
        <RoomsList title="Hallo2"></RoomsList>
        <RoomsList title="Hallo3"></RoomsList>
        <RoomsList title="SEW"></RoomsList>
        <RoomsList title="ITP2"></RoomsList>
        <RoomsList title="NWT"></RoomsList>
        <RoomsList title="Deutsch"></RoomsList>
        <RoomsList title="GGP"></RoomsList>
        <RoomsList title="GGP"></RoomsList>
        <RoomsList title="GGP"></RoomsList>
        <RoomsList title="GGP"></RoomsList>
        <RoomsList title="GGP"></RoomsList>
        <RoomsList title="GGP"></RoomsList>
        <RoomsList title="GGP"></RoomsList>
        <RoomsList title="GGP "></RoomsList>
      </div>
    </div>

    <ChatRoom></ChatRoom>
  </div>


</template>

<style scoped>
#chatrooms-container {
  overflow-y: scroll;
  height: 80.6vh;
  width: 100%;
}

#chatrooms-container, #userbar-container {
  border-right: 1px solid var(--color-border-very-soft);
  display: flex;
  flex-wrap: wrap;
}

#userbar-container {
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
  width: 70%;
}

#iconContainer {
  height: 100%;
  width: min-content;
  padding: 14.75px;
}

#container-div-short-menu {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  height: auto;
}

.menu-icons {
  padding: 5% 10%;
}

#container-div-short-user {
  border-bottom: 1px solid var(--color-border);
}


</style>