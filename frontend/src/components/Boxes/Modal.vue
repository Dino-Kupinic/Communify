<script setup lang="ts">

import ActionButton from "@/components/controls/ActionButton.vue"
import {ref} from "vue"
import TitleText from "@/components/text/TitleText.vue"
const displayStatus = ref('none')

defineProps<{
  modalTitle?: String
}>()

function reverseDisplayModal () {
    if (displayStatus.value === "none") {
      displayStatus.value = "flex"
    } else {
      displayStatus.value = "none"
    }
}

</script>

<template>
  <ActionButton @click="reverseDisplayModal">...</ActionButton>
  <div id="modal-container">
    <div id="modal-content-container">
      <TitleText>
        {{ modalTitle }}
      </TitleText>
      <span @click="reverseDisplayModal" class="close">Close</span>
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
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 5%;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

#modal-content-container {
  text-align: center;
  background-color: var(--color-background-soft);
  height: 50%;
  width: 40%;
  border-radius: 2rem;
  padding: 1%;
}
</style>