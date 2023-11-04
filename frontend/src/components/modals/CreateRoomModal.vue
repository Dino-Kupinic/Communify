<script setup lang="ts">
import type {Room, Topic} from "@/model/types"
import {maxLength, maxValue, minValue, required} from "@vuelidate/validators"
import {
  BADGE_NAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  MAXIMUM_USERS,
  MINIMUM_USERS,
  ROOM_NAME_MAX_LENGTH,
  ROOM_PASSWORD_MAX_LENGTH,
} from "@/model/type_constants"
import useVuelidate from "@vuelidate/core"
import {fetchData, getCurrentUserId} from "@/model/util-functions"
import Modal from "@/components/modals/Modal.vue"
import InputField from "@/components/controls/InputField.vue"
import Icon from "@/components/util/Icon.vue"
import BodyText from "@/components/text/BodyText.vue"
import {useRoomStore} from "@/stores/roomStore"
import {reactive, ref, watch} from "vue"
import DropDown from "@/components/util/DropDown.vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import Badge from "@/components/util/Badge.vue"
import HorizontalContainer from "@/components/util/HorizontalContainer.vue"
import ButtonText from "@/components/controls/ButtonText.vue"

let id = 0

const emit = defineEmits(["created"])
const badges = reactive(<Topic[]>[{}])
const roomStore = useRoomStore()
const isPrivateRoom = ref<boolean>(false)
const hexColors = ["Red", "Blue", "Green", "Yellow", "Purple", "Teal", "Orange", "Brown"]

let badgesFromDB: Topic[]

let topicCount = ref(5)
let isDisabled = ref(false)

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

const badgeState = reactive({
  badgeText: "",
  badgeColor: "",
})

const badgeRule = {
  badgeText: {
    required,
    maxLength: maxLength(BADGE_NAME_MAX_LENGTH),
  },
  badgeColor: {
    required,
  },
}

const v$ = useVuelidate(rules, state)
const vBadges$ = useVuelidate(badgeRule, badgeState)

function resetState() {
  Object.assign(state, initialState)
}

async function createRoom() {
  try {
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

    await roomStore.addRoom(room)
    await fetchBadges()
    for (const elem of badges) await createTopicAtRoomCreation(elem)
    emit("created")
    resetState()
  } catch (err) {
    console.error(err)
  }
}

async function getRoomIdByName() {
  try {
    const response: Room = await fetchData("http://localhost:4000/room/getRoomByName/" + state.name,
      "GET", [["Content-Type", "application/json"]],
    )
    if (response) {
      return response.room_id
    }
  } catch (err) {
    console.error(err)
  }
}

async function submitForm() {
  let ok = false
  const isFormCorrect = await vBadges$.value.$validate()
  badges.forEach((elem) => {
    if (elem.text === badgeState.badgeText) {
      ok = false
      return
    } else ok = true
  })
  if (!isFormCorrect || !ok) return
  addBadge()
}

watch(topicCount, () => {
  isDisabled.value = topicCount.value === 0
})

function addBadge() {
  badges.push({topic_id: id++, color: badgeState.badgeColor, text: badgeState.badgeText})
  topicCount.value--
  isDisabled.value = topicCount.value === 0
}

function removeBadgeByID(topic_id: number) {
  badges.forEach((badge) => {
    if (badge.topic_id === topic_id) {
      badges.splice(badges.indexOf(badge), 1)
      topicCount.value++;
    } else {
     console.log("BADGE NOT FOUND")
    }
  })
}

async function fetchBadges() {
  try {
    badgesFromDB = await fetchData("http://localhost:4000/topic/getTopics",
      "GET",
      [["Content-Type", "application/json"]],
    )
  } catch (err) {
    console.log(err)
  }
}

async function createTopicAtRoomCreation(badge: Topic) {
  let ok = false
  //Is badge already existing?
  badgesFromDB.forEach((badgeDB) => {
    if (badgeDB.text === badge.text) {
      ok = false
      return
    } else ok = true
  })

  if (ok) {
    try {
      const room_id = await getRoomIdByName()
      const response = await fetch("http://localhost:4000/topic/createTopic", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text: badge.text, color: badge.color, room_id: room_id}),
      })
      if (response.ok)
        await roomStore.fetchRooms()
    } catch (err) {
      console.error(err)
    }
  } else {
    await addTopicToRoom(badge)
  }
}

async function addTopicToRoom(badge: Topic) {
  try {
    const room_id = await getRoomIdByName()
    const response = await fetch("http://localhost:4000/topic/addTopicToRoom", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({topic_id: getTopicByName(badge.text), room_id: room_id}),
    })
    if (response.ok)
      await roomStore.fetchRooms()
  } catch (err) {
    console.error(err)
  }
}

function getTopicByName(topic_text: string) {
  let elemId
  badgesFromDB.forEach((elem) => {
    if (elem.text === topic_text) {
      elemId = elem.topic_id
      return
    } else return null
  })

  return elemId
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
      <InputField v-model="state.maximum_users" label="Maximum User (Optional)" id="max-user-input" type="number"
                  value="1" min="1"></InputField>
      <InputField v-model="state.password" label="Password (Optional)" type="password"></InputField>
      <div id="badge-colorpick-container">
        <InputField :class="{'input-error': vBadges$.badgeText.$error}" placeholder="Topic Name"
                    v-model="badgeState.badgeText" label="Topic Name">
          <template #below-input>
          </template>
        </InputField>
        <HorizontalContainer>
          <DropDown :class="{'input-error': vBadges$.badgeColor.$error}" label="Topic Color"
                    v-model="badgeState.badgeColor" type="ColorPicker" :list-elements="hexColors"></DropDown>
        </HorizontalContainer>
      </div>
      <HorizontalContainer>
        <ActionButton :disabled="isDisabled" id="add-badge" @click="submitForm" key="Add Topic"
                      margin="0.5rem 1.5rem 0.5rem "
                      height="max-content" width="max-content"
                      class="add-badge-button">
          <Icon image-name="add" file-extension="png"></Icon>
          <ButtonText>Add Bagde</ButtonText>
        </ActionButton>
        <span>Remaining Topics: {{ topicCount }}</span>
      </HorizontalContainer>

      <div id="topics-created-container">
        <Badge v-for="badge in badges" :key="badge.topic_id" :color="badge.color"
               @click="removeBadgeByID(badge.topic_id)">
          {{ badge.text }}
        </Badge>
      </div>

    </template>
    <template #left-btn-slot>
      <span @click="createRoom" id="save-btn">Save</span>
    </template>
  </Modal>
</template>

<style scoped>

#add-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

:deep(.add-badge-button) {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

#max-user-input {
  width: 50%;
}


#save-btn {
  font-weight: bold;
  cursor: pointer;
}

#max-user-input {
  width: 50%;
}

#badge-colorpick-container {
  display: flex;
  flex-wrap: wrap;
  width: auto;
  align-content: center;
}

.input-error :deep(input) {
  border-color: var(--error-400);
}

#topics-created-container {
  margin-left: 1.5rem;
}

</style>