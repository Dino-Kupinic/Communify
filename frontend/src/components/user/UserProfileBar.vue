<script setup lang="ts">

import UserIcon from "@/components/user/UserIcon.vue"
import UserProfileText from "@/components/user/UserProfileText.vue"
import {computed, onMounted, ref} from "vue"
import type {Client} from "@/model/types"
import ActionButton from "@/components/controls/ActionButton.vue"
import Icon from "@/components/util/Icon.vue"
import BodyText from "@/components/text/BodyText.vue"
import router from "@/router/router"

const username = ref<string>("")
const token = ref<string>(localStorage.getItem("auth_token") || "")
const profileLink = ref<string | undefined>("")

const isLoggedIn = computed(() => {
  return token.value !== ""
})

function logout() {
  token.value = ""

  localStorage.setItem("auth_token", "")
  router.push("/auth/login")
}

onMounted(async () => {
  await getProfile()
})

async function getProfile() {
  try {
    const response = await fetch("http://localhost:4000/auth/profile", {
      method: "GET",
      headers: {
        "access_token": token.value,
      },
    })
    const client: Client = await response.json()
    if (response) {
      profileLink.value = "clients/" + client.username + "/profile"
      username.value = client.username
    }
  } catch (err) {
    console.error(err)
  }
}

</script>

<template>
  <div class="container-div-short">
    <div id="icon-container">
      <UserIcon v-if="username" :initials="username[0].toUpperCase()"></UserIcon>
    </div>

    <UserProfileText id="username">
      {{ username }}
    </UserProfileText>
    <div id="user-logout-container">
      <ActionButton @click="logout" height="max-content" :hollow="true" id="logout">
        <Icon class="img" image-name="stop" file-extension="png"/>
        <BodyText class="logout-text">Logout</BodyText>
      </ActionButton>
    </div>
  </div>
</template>

<style scoped>
#username {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

.container-div-short {
  width: 100%;
  background-color: var(--color-background);
  display: flex;
  flex-direction: row;
  align-content: center;
  border-bottom: 1px solid var(--color-border-soft);
}

#icon-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}

#logout {
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
  padding-right: 1.5%;
  padding-left: 1.5%;
  height: 2rem;
}

.logout-text {
  color: var(--error-500);
}

:deep(#logout) {
  border: 1px solid var(--error-500);
  background-color: var(--error-200);
  color: var(--error-500)
}

.img {
  margin-right: 0.1rem;
}

span {
  padding-top: 3%;
}

#user-logout-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
</style>