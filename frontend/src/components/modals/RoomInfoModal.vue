<script setup lang="ts">
import Badge from "@/components/util/Badge.vue"
import ModalSubText from "@/components/text/ModalSubText.vue"
import Modal from "@/components/modals/Modal.vue"
import Icon from "@/components/util/Icon.vue"
import {useRoomStore} from "@/stores/roomStore"
import {inject, onMounted, ref} from "vue"
import type {Client, Room, Topic} from "@/model/types"
import {fetchData, getCurrentUserId} from "@/model/util-functions"
import {BACKEND_URL} from "@/socket/server"

const roomStore = useRoomStore()

const room: Room | undefined = inject("containerRoom")
const badges: Topic[] | undefined = inject("containerBadges")
const creator = ref<Client>()
const currentUserId = ref<number>()

async function deleteRoom() {
  if (room?.room_id != null && room?.creator_id === currentUserId.value)
    await roomStore.deleteRoom(room?.room_id)
  else
    alert("Only the creator can delete the room.")
}

onMounted(async () => {
  creator.value = await getCreator()
  currentUserId.value = await getCurrentUserId()
})

async function getCreator(): Promise<Client | undefined> {
  try {
    return await fetchData(`${BACKEND_URL}/client/getClientById/` + room?.creator_id, "GET", [["Content-Type", "application/json"]])
  } catch (err) {
    console.error(err)
  }
}

</script>

<template>
  <Modal>
    <template #modal-btn>
      <Icon class="details" image-name="more" file-extension="png"></Icon>
    </template>
    <template #modal-content>
      <br>
      <p>Created by {{ creator?.username }}</p>
      <p>Maximum Users: {{ room?.maximum_users || "unlimited" }}</p>
      <div class="subtheme-container">
        <ModalSubText title="Badges"></ModalSubText>
        <div id="badges">
          <Badge v-for="badge in badges" :color="badge.color"> {{ badge.text }}</Badge>
        </div>
      </div>
      <div class="subtheme-container">
        <ModalSubText title="Description"></ModalSubText>
        <p>{{ room?.description }}</p>
      </div>
    </template>
    <template #left-btn-slot>
      <span @click="deleteRoom" id="delete-btn">Delete</span>
    </template>
  </Modal>
</template>

<style scoped>
.details {
  margin-left: 0.5em;
  padding-left: 0.5%;
  cursor: pointer;
}

#badges {
  display: flex;
  flex-wrap: wrap;
  overflow-x: unset;
}

#delete-btn {
  font-weight: bold;
  cursor: pointer;
}

.subtheme-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>