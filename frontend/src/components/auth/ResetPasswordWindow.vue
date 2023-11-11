<script setup lang="ts">
import BodySubtitleText from "@/components/text/BodySubtitleText.vue"
import BodyText from "@/components/text/BodyText.vue"
import InputField from "@/components/controls/InputField.vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import {ref} from "vue"
import CodeInputBox from "@/components/boxes/CodeInputBox.vue"
import {fetchData} from "@/model/util-functions"
import type {Client} from "@/model/types"
import router from "@/router/router"
import {BACKEND_URL} from "@/socket/server"

const step = ref(1)
let email = ref("")
let username = ref("")
let isAvailable = false
const sixDigitArray: number[] = []
const passwordFirstLine = ref<string>("")
const passwordSecondLine = ref<string>("")
const client = ref<Client>()

const index1 = ref(0)
const index2 = ref(0)
const index3 = ref(0)
const index4 = ref(0)
const index5 = ref(0)
const index6 = ref(0)

async function submitData() {
  let alerted = false
  if (email.value === "" || username.value === "") {
    alert("Please fill in all fields!")
    alerted = true
  } else if (email.value.indexOf("@") === -1 && !alerted) {
    alert("Please enter a correct email address!")
    alerted = true
  } else {
    await getClientByUsername()
  }
  if (isAvailable && email.value == client.value?.email && !alerted) {
    await EmailSender()
    step.value = 2
  } else {
    if (!alerted) alert("Benutzer nicht vorhanden bzw. Email falsch!")
  }
}

async function getClientByUsername() {
  try {
    const response: Client = await fetchData("http://localhost:4000/client/getClientByUsername/" +
      username.value, "GET", [["Content-Type", "application/json"]])
    if (response) {
      client.value = response
      isAvailable = true
    }
  } catch (err) {
    console.log(err)
  }
}

async function submitCode() {
  const inputArray = [
    Number(index1.value),
    Number(index2.value),
    Number(index3.value),
    Number(index4.value),
    Number(index5.value),
    Number(index6.value),
  ]
  const value = inputArray.every((wert, index) => wert === sixDigitArray[index])
  if (value) {
    step.value = 3
  } else {
    alert("Code stimmt nicht! Versuche es erneut.")
  }
}

async function EmailSender() {
  const minNum = 0
  const maxNum = 9
  for (let i = 0; i < 6; i++) {
    const sixDigitValue = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
    sixDigitArray.push(sixDigitValue)
  }
  const mailParams = {
    to: email.value, subject: "Passwort Reset - Code for Confirmation", text: String(sixDigitArray),
  }
  try {
    const response = await fetch("http://localhost:4000/mail/sendEmail", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailParams),
    })
    if (response) {
      alert("Die Email wurde an " + email.value + " versendet!")
    } else {
      alert("Error at sending the email for password reset")
    }
  } catch (err) {
    console.log(err)
  }
}

async function submitPassword() {
  if (passwordFirstLine.value === passwordSecondLine.value) {
    const response = await fetch(`${BACKEND_URL}/auth/hashPassword/`, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password: passwordFirstLine.value}),
    })
    const hashedPassword = await response.json()
    await fetch("http://localhost:4000/client/editClientByUsername/" + client.value?.username, {
      method: "PUT",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({propertyToEdit: "password", newPropertyValue: hashedPassword.password}),
    })
    alert("Password successfully reset!")
    await router.push("/auth/login")
  } else {
    alert("Try it again. Passwords do not match.")
  }
}
</script>

<template>
  <BodySubtitleText id="body-subtitle-text-style">
    Password Reset
  </BodySubtitleText>
  <div v-if="step === 1" class="outsideContainer-step-1">
    <BodyText id="body-text-style">
      Please enter your email adress and username below.<br>
    </BodyText>
    <div class="container-step-1">
      <InputField label="Username" v-model="username" type="username" placeholder="Johannes Kerbl">
        <template #below-input>
        </template>
      </InputField>
      <InputField label="Email" v-model="email" type="email" placeholder="jkerbl@htl-steyr.ac.at">
        <template #below-input>
        </template>
      </InputField>
      <div class="button-container">
        <ActionButton @click="submitData" class="btn" width="90%" height="3rem">Reset password</ActionButton>
      </div>
    </div>
  </div>
  <div v-if="step === 2" id="number-entering-info"> Enter the 6-digit code which you received per email.</div>
  <div v-if="step === 2" class="outsideContainer-step-2">
    <div class="container-step-2">
      <div id="rectangle-container">
        <CodeInputBox @response="(msg) => index1 = msg" placeholder="."></CodeInputBox>
        <CodeInputBox @response="(msg) => index2 = msg" placeholder="."></CodeInputBox>
        <CodeInputBox @response="(msg) => index3 = msg" placeholder="."></CodeInputBox>
        <CodeInputBox @response="(msg) => index4 = msg" placeholder="."></CodeInputBox>
        <CodeInputBox @response="(msg) => index5 = msg" placeholder="."></CodeInputBox>
        <CodeInputBox @response="(msg) => index6 = msg" placeholder="."></CodeInputBox>
      </div>
      <div class="button-container-step-2">
        <ActionButton @click="submitCode" class="btn" width="90%" height="3rem">Submit Code</ActionButton>
      </div>
    </div>
  </div>
  <BodyText v-if="step === 3" id="body-text-style-step-3">
    Please enter your new Password!<br>
  </BodyText>
  <div v-if="step === 3" class="container-step-3">
    <InputField v-model="passwordFirstLine" label="Enter password" type="password">
      <template #below-input>
      </template>
    </InputField>
    <InputField v-model="passwordSecondLine" label="Confirm password" type="password">
      <template #below-input>
      </template>
    </InputField>
    <div class="button-container">
      <ActionButton @click="submitPassword" class="btn" width="90%" height="3rem">Submit your new Password
      </ActionButton>
    </div>
  </div>
</template>

<style scoped>
#body-subtitle-text-style {
  margin-top: 3rem;
}

.container-step-1 {
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 1px solid var(--neutral-700);
  border-radius: 1rem;
  padding: 1.2rem;
  min-width: 30em;
  margin-top: 1.2em;
  margin-left: auto;
  margin-right: auto;
}

.container-step-2 {
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 1px solid var(--neutral-700);
  border-radius: 1rem;
  width: 50%;
  height: 15em;
  justify-content: center;
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;
}

.container-step-3 {
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 1px solid var(--neutral-700);
  border-radius: 1rem;
  width: 50%;
  max-width: 35rem;
  height: 18.5em;
  margin-top: 3em;
}

.outsideContainer-step-2 {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-container-step-2 {
  margin-top: 1em;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}


#body-text-style {
  margin-bottom: 2rem;
  text-align: center;
  margin-top: 0.5em;
}

#body-text-style-step-3 {
  text-align: center;
}

.btn {
  border-radius: 0.5rem;
}

#rectangle-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}

@media screen and (max-width: 614px) {
  .container-step-2 {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    border: 1px solid var(--neutral-700);
    border-radius: 1rem;
    width: 100%;
    height: 20em;
    justify-content: center;
    align-content: center;
    display: flex;
    flex-wrap: wrap;
    margin-top: 3rem;
  }
}

#number-entering-info {
  margin-top: 0.5em;
}
</style>