<script setup lang="ts">

import Modal from "@/components/modals/Modal.vue"
import InputField from "@/components/controls/InputField.vue"
import {useVModel} from "@vueuse/core"
import type {Room} from "@/model/types"
import {inject, ref} from "vue"
import {useRoomStore} from "@/stores/roomStore"


let emit = defineEmits(["joined"])
let room : Room = <Room>inject('containerRoom');
let enteredPswd = ref<string>()
const roomStore = useRoomStore()

function checkPswd () {
  if (room.password) {
    if (room?.password === enteredPswd.value) {
      joinRoom(room)
      enteredPswd.value = ""
    }
  } else {
    joinRoom(room)
  }
}

function joinRoom(room: Room) {
  roomStore.currentRoom = roomStore.currentRoom = roomStore.rooms.find(roomItem => room === roomItem)
}
</script>

<template>
<Modal v-if="room?.password" modal-title="Room-Login">
  <template #modal-btn>
    <slot name="password-modal-btn"></slot>
  </template>
  <template #modal-content>
    <InputField v-model="enteredPswd" label="Enter Password" type="password"></InputField>
  </template>
  <template #left-btn-slot>
    <span @click="checkPswd">Submit</span>
  </template>
</Modal>
</template>

<style scoped>
span {
  font-weight: bold;
  cursor: pointer;
}
</style>