<script setup lang="ts">

import BodySubtitleText from "@/components/text/BodySubtitleText.vue"
import BodyText from "@/components/text/BodyText.vue"
import InputError from "@/components/controls/InputError.vue"
import InputField from "@/components/controls/InputField.vue"
import ActionButton from "@/components/controls/ActionButton.vue"
import {state} from "vue-tsc/out/shared"
import {ref} from "vue"
import CodeInputBox from "@/components/boxes/CodeInputBox.vue"

const step = ref(1)

let email = ref("")
let username = ref("")

function submitData() {
  if (email.value === "" || username.value === "") {
    alert("Please fill in all fields!")
  } else if (email.value.indexOf("@") === -1) {
    alert("Please enter a correct email address!")
    /*
        Logik bzw. Abfrage ob Email-Adresse und Username vorhanden.
            Ansonsten ebenfalls wieder eine Fehlermeldung!
     */
  } else {
    step.value = 2
  }
}

function submitCode() {
  alert("Hat funktioniert - Step = 3 ist aktiv!")
  step.value = 3
}


</script>

<template>
  <BodySubtitleText id="body-subtitle-text-style">
    Password Reset
  </BodySubtitleText>

  <div v-if="step === 1" class="container-step-1">
    <BodyText id="body-text-style">
      Please enter your email adress and username below.<br>
    </BodyText>

    <InputField label="Email" v-model="email" type="email" placeholder="jkerbl@htl-steyr.ac.at">
      <template #below-input>
      </template>
    </InputField>

    <InputField label="Username" v-model="username" type="username" placeholder="Johannes Kerbl">
      <template #below-input>
      </template>
    </InputField>

    <div class="button-container">
      <ActionButton @click="submitData" class="btn" width="90%" height="3rem">Reset password</ActionButton>
    </div>
  </div>
  <div v-if="step === 2" class="container-step-2">
    <div id="number-entering-info">
      Enter the 6-digit code which you received per email.
    </div>
    <div id="rectangle-container">
      <CodeInputBox placeholder="1"></CodeInputBox>
      <CodeInputBox placeholder="2"></CodeInputBox>
      <CodeInputBox placeholder="3"></CodeInputBox>
      <CodeInputBox placeholder="4"></CodeInputBox>
      <CodeInputBox placeholder="5"></CodeInputBox>
      <CodeInputBox placeholder="6"></CodeInputBox>
    </div>
    <div class="button-container">
      <ActionButton @click="submitCode" class="btn" width="90%" height="3rem">Submit Code</ActionButton>
    </div>
  </div>
  <div v-if="step === 3" class="container-step-3">
    <p>
      <br>
      Hallo!
      <br><br>
    </p>
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
  width: 25%;
  min-width: 360px;
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
  max-width: 35rem;
  height: 15em;
  justify-content: center;
  align-content: center;
  display: flex;
  flex-wrap: wrap;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#body-text-style {
  margin-bottom: 2rem;
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

#number-entering-info {
  margin-bottom: 1em;
  font-size: 1.1em;
  padding-left: 1em;
  padding-right: 1em;
  text-align: center;
}
</style>