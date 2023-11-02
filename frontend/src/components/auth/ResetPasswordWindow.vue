<script setup lang="ts">

import BodySubtitleText from "@/components/text/BodySubtitleText.vue"
import BodyText from "@/components/text/BodyText.vue"
import InputError from "@/components/controls/InputError.vue"
import InputField from "@/components/controls/InputField.vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import {state} from "vue-tsc/out/shared"
import {ref} from "vue"
import CodeInputBox from "@/components/boxes/CodeInputBox.vue"
import {fetchData} from "@/model/util-functions"
import type {Client} from "@/model/types"

const step = ref(1)
let email = ref("")
let username = ref("")
let isAvailable = false
const passwordFirstLine = ref<string>("")
const passwordSecondLine = ref<string>("")
const client = ref<Client>()

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

function submitCode() {
  /*
      Aufrufen der Email-Sender Funktion!
  */
  step.value = 3
}

async function submitPassword() {
  // console.log(`${client.value?.password} ${passwordFirstLine.value}`)
  /*const newClient = {propertyToEdit:"password", newPropertyValue:passwordFirstLine.value}*/
  /* passwordFirstLine.value = crypto.createHash("sha256").update(passwordFirstLine.value).digest("hex")*/
  await fetch("http://localhost:4000/client/editClientByUsername/" + client.value?.username, {
    method: "PUT",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({propertyToEdit: "password", newPropertyValue: passwordFirstLine.value}),
  })
  alert("Password successfully reset!")
  step.value = 4
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
  <div v-if="step === 2" id="number-entering-info"> Enter the 6-digit code which you received per email. </div>
  <div v-if="step === 2" class="outsideContainer-step-2">
    <div class="container-step-2">
      <div id="rectangle-container">
        <CodeInputBox placeholder="."></CodeInputBox>
        <CodeInputBox placeholder="."></CodeInputBox>
        <CodeInputBox placeholder="."></CodeInputBox>
        <CodeInputBox placeholder="."></CodeInputBox>
        <CodeInputBox placeholder="."></CodeInputBox>
        <CodeInputBox placeholder="."></CodeInputBox>
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
      <ActionButton @click="submitPassword" class="btn" width="90%" height="3rem">Submit Code</ActionButton>
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

@media screen and (max-width: 614px){
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