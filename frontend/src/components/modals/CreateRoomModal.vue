<script setup lang="ts">
import type {Client, Room} from "@/model/types"
import {maxLength, maxValue, minValue, required} from "@vuelidate/validators"
import {
  DESCRIPTION_MAX_LENGTH,
  MAXIMUM_USERS,
  MINIMUM_USERS,
  ROOM_NAME_MAX_LENGTH,
  ROOM_PASSWORD_MAX_LENGTH,
} from "@/model/type_constants"
import useVuelidate from "@vuelidate/core"
import {fetchData} from "@/model/util-functions"
import Modal from "@/components/modals/Modal.vue"
import InputField from "@/components/controls/InputField.vue"
import Icon from "@/components/util/Icon.vue"
import BodyText from "@/components/text/BodyText.vue"
import {useRoomStore} from "@/stores/roomStore"
import {reactive, ref} from "vue"

const emit = defineEmits(["created"])

const roomStore = useRoomStore()
const isPrivateRoom = ref<boolean>(false)

const initialState: Room = reactive({
  room_id: null,
  name: "",
  maximum_users: null,
  description: null,
  password: null,
  creator_id: 0,
})

const state = reactive<Room>({...initialState})

// TODO: Display errors
const rules = {
  name: {
    required,
    maxLength: maxLength(ROOM_NAME_MAX_LENGTH),
  },
  maximum_users: {
    minValue: minValue(MINIMUM_USERS),
    maxValue: maxValue(MAXIMUM_USERS),
  },
  description: {
    maxLength: maxLength(DESCRIPTION_MAX_LENGTH),
  },
  password: {
    maxLength: maxLength(ROOM_PASSWORD_MAX_LENGTH),
  },
}

const v$ = useVuelidate(rules, state)

function resetState() {
  Object.assign(state, initialState)
}

async function getCurrentUserId(): Promise<number> {
  const token: string | null = localStorage.getItem("auth_token")
  if (token) {
    const client: Client = await fetchData("http://localhost:4000/auth/profile", "GET", [["access_token", token]])
    return client.user_id as number
  }
  throw new Error("User not authorized")
}

async function createRoom() {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  const creator_id = await getCurrentUserId()
  const room: Room = {
    room_id: null,
    name: state.name,
    maximum_users: state.maximum_users,
    description: state.description,
    password: state.password,
    creator_id: creator_id,
  }

  try {
    await roomStore.addRoom(room)
    emit("created")
    resetState()
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <Modal>
    <template #modal-btn>
      <Icon class="img" image-name="add" file-extension="png"/>
      <BodyText class="btn-span">Create Room</BodyText>
    </template>
    <template #modal-content>
      <InputField v-model="state.name" label="Name" placeholder="My Room "></InputField>
      <InputField v-model="state.description" label="Description (Optional)"></InputField>
      <InputField v-model="state.maximum_users" label="Maximum User (Optional)" id="max-user-input" type="number" value="1" min="1"></InputField>
      <InputField v-if="isPrivateRoom" v-model="state.password" label="Password (Optional)" type="password"></InputField>
    </template>
    <template #second-btn>
      <span @click="createRoom" id="save-btn">Save</span>
    </template>
  </Modal>
</template>

<style scoped>
#max-user-input {
  width: 50%;
}
</style>