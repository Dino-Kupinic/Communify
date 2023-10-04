<script setup lang="ts">

import RoomsList from "@/components/chatrooms/RoomsList.vue"
import UserProfileBar from "@/components/user/UserProfileBar.vue"
import ChatRoom from "@/components/chatrooms/ChatRoom.vue"


</script>

<template>
  <div id="Site-Container">
    <div id="userbar-chatrooms-container">
      <div id="userbar-container">
        <UserProfileBar username="Neuery17"></UserProfileBar>
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
  height: 89.4vh;
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

#Site-Container {
  display: flex;
}

#userbar-chatrooms-container {
  width: 25%;
}


</style>