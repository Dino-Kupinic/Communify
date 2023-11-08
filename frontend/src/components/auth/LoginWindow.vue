<script setup lang="ts">
import {reactive} from "vue"
import type {LoginClient, LoginReponse} from "@/model/types"
import router from "@/router/router"
import {maxLength, minLength, required} from "@vuelidate/validators"
import BodyText from "@/components/text/BodyText.vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import useVuelidate from "@vuelidate/core"
import InputField from "@/components/controls/InputField.vue"
import {USERNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH} from "@/model/type_constants"
import InputError from "@/components/controls/InputError.vue"
import BodySubtitleText from "@/components/text/BodySubtitleText.vue"
import Link from "@/components/text/Link.vue"
import GoogleIcon from "@/components/util/GoogleIcon.vue"
import {BACKEND_URL} from "@/socket/server"

const state: LoginClient = reactive({
  username: "",
  password: "",
})

const rules = {
  username: {
    required,
    maxLength: maxLength(USERNAME_MAX_LENGTH),
  },
  password: {
    required,
    minLength: minLength(PASSWORD_MIN_LENGTH),
    maxLength: maxLength(USERNAME_MAX_LENGTH),
  },
}

const v$ = useVuelidate(rules, state)

async function submitForm() {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  // can't login as unknown placeholder user
  if (state.username == "[unknown]" && state.password == "unknown")
    return

  const loginUser: LoginClient = {
    username: state.username,
    password: state.password,
  }

  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    })
    if (response.status !== 200)
      return
    const content: LoginReponse = await response.json()
    localStorage.setItem("auth_token", content.token)
    await router.push("/chats")
  } catch (err) {
    console.error(err)
  }
}
</script>
<template>
  <BodySubtitleText class="title" font-size="1.8rem">Welcome back. Please login.</BodySubtitleText>
  <div class="container">
    <InputField :class="{'input-error': v$.username.$error}" v-model="state.username" label="Username">
      <template #below-input>
        <InputError field="username" :v$="v$"></InputError>
      </template>
    </InputField>
    <InputField :class="{'input-error': v$.password.$error}" v-model="state.password" label="Password" type="password">
      <template #below-input>
        <InputError field="password" :v$="v$"></InputError>
      </template>
    </InputField>
    <div class="button-container">
      <ActionButton @click="submitForm" class="btn" width="90%" height="3rem">Log in</ActionButton>
    </div>
  </div>
  <BodyText class="register-text">
    New to Communify?
    <Link @click="router.push('/auth/register')">
      <span>
        Register now<GoogleIcon name="North_East" font-size="1.1rem" line-height="1.3"></GoogleIcon>
      </span>
    </Link>

  </BodyText>
  <BodyText class="reset-text">
    Forgot your password?
    <Link @click="router.push('/auth/recovery')">
      <span>
        Reset it<GoogleIcon name="North_East" font-size="1.1rem" line-height="1.3"></GoogleIcon>
      </span>
    </Link>
  </BodyText>
</template>

<style>
.container {
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 1px solid var(--neutral-700);
  border-radius: 1rem;
  padding: 1.2rem;
  width: 25%;
  min-width: 360px;
  margin-top: 1.2em;
  margin-left: auto;
  margin-right: auto;
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
  margin-top: 3%;
  font-size: 1.5em;
}


.input-error :deep(input) {
  border-color: var(--error-400);
}

@media screen and (max-width: 600px) {
  .container {
    width: 80%;
    min-width: 200px;
  }
}

.register-text {
  margin-top: 1em;
}

.reset-text {
  margin-top: 0.2em;
}

</style>