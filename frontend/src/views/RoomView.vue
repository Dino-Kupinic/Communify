<script setup lang="ts">

import RoomsList from "@/components/chatrooms/RoomsList.vue"
import UserProfileBar from "@/components/user/UserProfileBar.vue"


</script>

<template>
  <div id="userbar-container">
    <UserProfileBar username="Neuery17" profilePicture="undefined"></UserProfileBar>
  </div>
  <div id="chatrooms-container" @click="test">
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

</template>

<style scoped>
#chatrooms-container {
  overflow-y: scroll;
  height: 89.4vh;
  width: 25%;
}

#chatrooms-container, #userbar-container{
  border-right: 1px solid var(--color-border-very-soft);
}

#userbar-container {
  width: 25%;
  border-bottom: 1px solid var(--color-border-soft);
}




</style>