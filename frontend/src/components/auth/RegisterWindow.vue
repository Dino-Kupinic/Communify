<script setup lang="ts">
import {reactive} from "vue"
import {email, helpers, maxLength, maxValue, minLength, minValue, required} from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import InputField from "@/components/controls/InputField.vue"
import BodyText from "@/components/text/BodyText.vue"
import router from "@/router/router"
import InputError from "@/components/controls/InputError.vue"
import type {Client} from "@/model/types"
import {
  EMAIL_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  AGE_MIN_LENGTH, AGE_MAX_LENGTH, BIOGRAPHY_MAX_LENGTH,
} from "@/model/type_constants"
import ActionButton from "@/components/controls/ActionButton.vue"
import BodySubtitleText from "@/components/text/BodySubtitleText.vue"
import Link from "@/components/text/Link.vue"
import OptionalInputField from "@/components/controls/OptionalInputField.vue"
import {BACKEND_URL} from "@/socket/server"

const state: Client = reactive({
  user_id: null,
  username: "",
  email: "",
  password: "",
  biography: "",
  age: 0,
  member_since: "",
  current_room_id: null,
})

const rules = {
  username: {
    required,
    maxLength: maxLength(USERNAME_MAX_LENGTH),
  },
  password: {
    required,
    minLength: minLength(PASSWORD_MIN_LENGTH),
    maxLength: maxLength(PASSWORD_MAX_LENGTH),
  },
  email: {
    required,
    email,
    maxLength: maxLength(EMAIL_MAX_LENGTH),
  },
  age: {
    required,
    minValue: minValue(AGE_MIN_LENGTH),
    maxValue: maxValue(AGE_MAX_LENGTH),
  },
  biography: {
    maxLength: maxLength(BIOGRAPHY_MAX_LENGTH),
  },
}

const v$ = useVuelidate(rules, state)

async function submitForm() {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  state.member_since = getJoinDate()
  if (state.biography == undefined)
    state.biography = null

  const user: Client = {
    user_id: null,
    username: state.username,
    password: state.password,
    email: state.email,
    biography: state.biography,
    age: state.age,
    member_since: state.member_since,
    current_room_id: null,
  }

  try {
    await fetch(`${BACKEND_URL}/client/createClient`, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    await router.push("/auth/login")
  } catch (err) {
    console.error(err)
  }
}

function getJoinDate(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

</script>

<template>
  <BodySubtitleText class="title" font-size="1.8rem">Sign up here. Welcome aboard!</BodySubtitleText>
  <div class="container">
    <div class="split-input-container">
      <InputField :class="{'input-error': v$.username.$error}" id="split-container-inside-left" v-model="state.username" label="Username" placeholder="Dino Kupinic">
        <template #below-input>
          <InputError field="username" :v$="v$"></InputError>
        </template>
      </InputField>
      <InputField :class="{'input-error': v$.age.$error}" id="split-container-inside-right" v-model="state.age" label="Age" type="number">
        <template #below-input>
          <InputError field="age" :v$="v$"></InputError>
        </template>
      </InputField>
    </div>
    <InputField :class="{'input-error': v$.password.$error}" v-model="state.password" label="Password" type="password">
      <template #below-input>
        <InputError field="password" :v$="v$"></InputError>
      </template>
    </InputField>
    <InputField :class="{'input-error': v$.email.$error}" v-model="state.email" label="E-Mail Address" type="email"
                placeholder="dkupinic@htl-steyr.ac.at">
      <template #below-input>
        <InputError field="email" :v$="v$"></InputError>
      </template>
    </InputField>
    <OptionalInputField :class="{'input-error': v$.biography && v$.biography.$error}" v-model="state.biography"
                        label="Biography (Optional)" placeholder="I love listening to music and programming">
      <template #below-input>
        <InputError field="biography" :v$="v$"></InputError>
      </template>
    </OptionalInputField>
    <div class="button-container">
      <ActionButton @click="submitForm" class="btn" width="90%" height="3rem">Create my account</ActionButton>
    </div>
  </div>
  <BodyText id="body-text-register">
    Already have an account?
    <Link @click="router.push('/auth/login')">Login</Link>
  </BodyText>
</template>

<style scoped>
.container {
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 1px solid var(--neutral-700);
  border-radius: 1rem;
  padding: 1.2rem;
  width: 25%;
  min-width: 360px;
  margin: auto;
}

.input-error :deep(input) {
  border-color: var(--error-400);
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.btn) {
  border-radius: 0.5rem;
}

.title {
  margin-bottom: 0.5em;
  display: block;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .container {
    width: 80%;
    min-width: 200px;
  }
}

.split-input-container {
  display: flex;
}

#split-container-inside-right {
  width: 30%;
}

#split-container-inside-left {
  width: 70%;
}

#body-text-register {
  margin-top: 1em;
}

</style>