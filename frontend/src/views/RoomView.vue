<script setup lang="ts">

import RoomsList from "@/components/chatrooms/RoomsList.vue"
</script>

<template>
  <div id="chatrooms-container">
    <RoomsList title="Hallo1"></RoomsList>
    <RoomsList title="Hallo2"></RoomsList>
    <RoomsList title="Hallo3"></RoomsList>
    <RoomsList title="SEW"></RoomsList>
    <RoomsList title="ITP2"></RoomsList>
    <RoomsList title="NWT"></RoomsList>
    <RoomsList title="Deutsch"></RoomsList>
    <RoomsList title="GGP"></RoomsList>
  </div>

</template>

<style scoped>
#chatrooms-container {
  border: 1px solid var(--color-border-very-soft);
  width: 25%;
  overflow-y: scroll;
  height: 95vh;
}




</style>