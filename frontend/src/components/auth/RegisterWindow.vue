<script setup lang="ts">
import {reactive} from "vue"
import {email, helpers, maxLength, maxValue, minLength, minValue, required} from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import InputField from "@/components/controls/InputField.vue"
import BodyText from "@/components/text/BodyText.vue"
import router from "@/router/router"
import InputError from "@/components/controls/InputError.vue"
import type {Client} from "@/model/types"
import {EMAIL_MAX_LENGTH, MAX_LENGTH, PASSWORD_MIN_LENGTH} from "@/model/user_constants"
import ActionButton from "@/components/controls/ActionButton.vue"
import BodySubtitleText from "@/components/text/BodySubtitleText.vue"
import Link from "@/components/text/Link.vue"
import OptionalInputField from "@/components/controls/OptionalInputField.vue"

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
    maxLength: maxLength(MAX_LENGTH),
  },
  password: {
    required,
    minLength: minLength(PASSWORD_MIN_LENGTH),
    maxLength: maxLength(MAX_LENGTH),
  },
  email: {
    required,
    email,
    maxLength: maxLength(EMAIL_MAX_LENGTH),
  },
  age: {
    required,
    maxValue: maxValue(150),
  },
  biography: {
    maxLength: maxLength(1000),
  },
}

const v$ = useVuelidate(rules, state)

async function submitForm() {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  const user: Client = {
    "user_id": null,
    "username": state.username,
    "password": state.password,
    "email": state.email,
    "biography": state.biography,
    "age": state.age,
    "member_since": state.member_since,
    "current_room_id": null,
  }

  try {
    await fetch("http://localhost:4000/client/createClient", {
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

</script>

<template>
  <BodySubtitleText class="title" font-size="1.8rem">Create your account</BodySubtitleText>
  <div class="container">
    <InputField :class="{'input-error': v$.username.$error}" v-model="state.username" label="Username" placeholder="Dino Kupinic">
      <template #below-input>
        <InputError field="username" :v$="v$"></InputError>
      </template>
    </InputField>
    <InputField :class="{'input-error': v$.password.$error}" v-model="state.password" label="Password" type="password">
      <template #below-input>
        <InputError field="password" :v$="v$"></InputError>
      </template>
    </InputField>
    <InputField :class="{'input-error': v$.email.$error}" v-model="state.email" label="E-Mail Address" type="email" placeholder="dkupinic@htl-steyr.ac.at">
      <template #below-input>
        <InputError field="email" :v$="v$"></InputError>
      </template>
    </InputField>
    <InputField :class="{'input-error': v$.age.$error}" v-model="state.age" label="Age" type="number">
      <template #below-input>
        <InputError field="age" :v$="v$"></InputError>
      </template>
    </InputField>
    <OptionalInputField :class="{'input-error': v$.biography && v$.biography.$error}" v-model="state.biography"
                        label="Biography" placeholder="I love listening to music and programming">
      <template #below-input>
        <InputError field="biography" :v$="v$"></InputError>
      </template>
    </OptionalInputField>
    <div class="button-container">
      <ActionButton @click="submitForm" class="btn" width="88%" height="3rem">Create my account</ActionButton>
    </div>
  </div>
  <BodyText>
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
  display: block;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .container {
    width: 80%;
    min-width: 200px;
  }
}
</style>