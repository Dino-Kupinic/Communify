<script setup lang="ts">
import TitleText from "@/components/text/TitleText.vue"
import {computed, onMounted, ref} from "vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import Icon from "@/components/util/Icon.vue"
import Modal from "@/components/Boxes/Modal.vue"
import Badge from "@/components/util/Badge.vue"
import type {Room, Topic} from "@/model/types"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import BodyText from "@/components/text/BodyText.vue"
import ModalSubText from "@/components/text/ModalSubText.vue"
import {fetchData} from "@/model/util-functions"
import {useRoomStore} from "@/stores/roomStore"

const props = defineProps<{
  room: Room,
}>()

const emits = defineEmits<{
  joined: [getRoomId: string]
}>()

const roomStore = useRoomStore()
const badges = ref<Topic[]>()

onMounted(() => {
  loadBadges()
})

async function loadBadges() {
  try {
    badges.value = await fetchData("http://localhost:4000/topic/getTopicsByRoomId/" + props.room.room_id,
      "GET",
      [["Content-Type", "application/json"]],
    )
  } catch (err) {
    console.log(err)
  }
}

async function deleteRoom() {
  if (props.room.room_id != null)
    await roomStore.deleteRoom(props.room.room_id)
}

const getRoomId = computed(() => {
  return "room-" + props.room.room_id
})

</script>

<template>
  <div id="chatroom-div">
    <TitleText :title="room.name"></TitleText>
    <Modal>
      <template #modal-btn>
        <Icon class="details" image-name="more" file-extension="png"></Icon>
      </template>
      <template #modal-content>
        <p id="title">
          <TitleText title="Chatroom Info"></TitleText>
        </p>
        <div class="subtheme-container">
          <ModalSubText title="Badges"></ModalSubText>
          <div id="badges">
            <Badge v-for="badge in badges" :color="badge.color"> {{ badge.text }}</Badge>
          </div>
        </div>
        <div class="subtheme-container">
          <ModalSubText title="Description"></ModalSubText>
          <p>{{ room.description }}</p>
        </div>
      </template>
      <template #second-btn>
        <span @click="deleteRoom" id="delete-btn">Delete</span>
      </template>
    </Modal>
    <div id="badges-div">
      <Badge v-for="badge in badges" id="badge" :color="badge.color"> {{ badge.text }}</Badge>
    </div>
    <div class="join-button-div">
      <div id="lock-div">
        <Icon v-if="room.password !== null" image-name="locked" file-extension="png"></Icon>
      </div>
      <ActionButton @click="$emit('joined', getRoomId)" class="join-button" width="5rem">
        <GoogleIcon padding="0" name="Arrow_right"></GoogleIcon>
        <BodyText class="join-text">Join</BodyText>
      </ActionButton>
    </div>
  </div>
</template>

<style scoped>
.join-button-div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.join-text {
  margin-top: 0.2rem;
}

:deep(.join-button) {
  background-color: var(--warning-300);
  color: var(--warning-700);
  border: 1px solid var(--warning-700);
  margin-left: auto;
}

:deep(.join-button:hover) {
  background-color: var(--warning-400);
  color: var(--warning-800);
  border: 1px solid var(--warning-800);
}

.join-text {
  color: var(--warning-800);
}

.details {
  padding-left: 0.5%;
  cursor: pointer;
}

#chatroom-div {
  width: 100%;
  height: 10em;
  padding: 5%;
  border-bottom: 1px solid var(--color-border-soft);
  background-color: var(--color-background);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.details {
  margin-left: 0.5em;
  cursor: pointer;
}

#chatroom-div:hover {
  background-color: var(--color-background-soft);
}

#title {
  font-size: 3rem;
}

#badges {
  display: flex;
  flex-wrap: wrap;
  overflow-x: unset;
}

#delete-btn {
  font-weight: bold;
}

.subtheme-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

#lock-div {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

#badges-div {
  width: 100%;
}


</style>