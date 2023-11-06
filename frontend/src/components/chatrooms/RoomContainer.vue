<script setup lang="ts">
import TitleText from "@/components/text/TitleText.vue"
import {onMounted, provide, reactive, ref} from "vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import Icon from "@/components/util/Icon.vue"
import Badge from "@/components/util/Badge.vue"
import type {Room, Topic} from "@/model/types"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import BodyText from "@/components/text/BodyText.vue"
import {fetchData} from "@/model/util-functions"
import RoomInfoModal from "@/components/modals/RoomInfoModal.vue"
import {useRoomStore} from "@/stores/roomStore"
import PasswordModal from "@/components/modals/PasswordModal.vue"
import {useVModel} from "@vueuse/core"

const props = defineProps<{
  room: Room,
  modelValue: string
}>()

const enteredPswd = ref<string>()

const emits = defineEmits<{
  joined: [room: Room]
  refreshed: ["refreshed"]
  entered: ["entered"]
}>()

const rooms = ref<Room[]>()
const roomStore = useRoomStore()

const badges = ref<Topic[]>()
provide("containerBadges", badges)
provide("containerRoom", props.room)

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

async function refreshRoomsOnDeleted() {
  emits("refreshed", "refreshed")
}

function okBtnClickedInPswd () {
  emits("entered", "entered")
}

let input= useVModel(props, "modelValue", emits)

</script>

<template>
  <div id="chatroom-div">
    <TitleText :title="room.name" text-align="none">
      <RoomInfoModal @deleted="refreshRoomsOnDeleted" :modalTitle="room.name"></RoomInfoModal>
    </TitleText>
    <div id="badges-div">
      <Badge v-for="badge in badges" id="badge" :color="badge.color"> {{ badge.text }}</Badge>
    </div>
    <div class="join-button-div">
      <div id="lock-div">
        <Icon v-if="room.password !== null" image-name="locked" file-extension="png"></Icon>
      </div>
      <PasswordModal v-if="room.password !== null" v-model="input" @joined="okBtnClickedInPswd">
        <template #password-modal-btn>
          <ActionButton @click="$emit('joined', props.room)" class="join-button" width="5rem">
            <GoogleIcon padding="0" name="Arrow_right"></GoogleIcon>
            <BodyText class="join-text">Join</BodyText>
          </ActionButton>
        </template>
      </PasswordModal>
      <ActionButton v-else @click="$emit('joined', props.room)" class="join-button" width="5rem">
        <GoogleIcon padding="0" name="Arrow_right"></GoogleIcon>
        <BodyText class="join-text">Join</BodyText>
      </ActionButton>
    </div>
  </div>
</template>

<style scoped>
.join-button-div {
  margin-top: 0.5rem;
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
  width: 6rem;
}

:deep(.join-button:hover) {
  background-color: var(--warning-400);
  color: var(--warning-800);
  border: 1px solid var(--warning-800);
}

.join-text {
  color: var(--warning-800);
}

#chatroom-div {
  width: 100%;
  border-bottom: 1px solid var(--color-border-soft);
  height: max-content;
  padding: 5%;
  background-color: var(--color-background);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

#chatroom-div:hover {
  background-color: var(--color-background);
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