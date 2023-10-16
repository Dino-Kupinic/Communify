<script setup lang="ts">

import {ref} from "vue"
import TitleText from "@/components/text/TitleText.vue"

const displayStatus = ref("none")


defineProps<{
  modalTitle?: string
}>()

function reverseDisplayModal() {
  if (displayStatus.value === "none") {
    displayStatus.value = "flex"
  } else {
    displayStatus.value = "none"
  }
}

</script>

<template>
  <div id="container" @click="reverseDisplayModal">
    <slot name="modal-btn"></slot>
  </div>
  <div id="modal-container">
    <div id="modal-content-container">
      <p id="title">
        <TitleText :title="modalTitle"></TitleText>
      </p>
      <slot name="modal-content"></slot>
      <div id="btn-container">
        <div id="save-btn-div" @click="reverseDisplayModal">
          <span class="close">
            <slot name="second-btn"></slot>
          </span>
        </div>
        <div id="close-btn-div">
          <span @click="reverseDisplayModal" class="close">Close</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#modal-container {
  display: v-bind(displayStatus);
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 5%;
}

/* The Close Button */
.close {
  color: #aaa;
  font-size: 20px;
  font-weight: bold;
  top: auto;
  margin-left: auto;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

#modal-content-container {
  background-color: var(--color-background-soft);
  height: 50%;
  width: 40%;
  border-radius: 2rem;
  padding: 1%;
  display: flex;
  flex-direction: column;
  text-align: left;
}

#close-btn-div {
  width: min-content;
  margin-left: auto;
  align-self: flex-end;
  margin-top: auto;
}

#save-btn-div {
  margin-top: auto; /* Move to the bottom */
  margin-left: 0;
}

#title {
  font-size: 2rem;
}

#btn-container {
  display: flex;
  position: relative;
  margin-top: auto;
}

#container {
  display: flex;
  flex-direction: row;
}

</style>