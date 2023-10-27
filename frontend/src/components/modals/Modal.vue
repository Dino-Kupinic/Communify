<script setup lang="ts">
import {ref} from "vue"
import NormalButton from "@/components/controls/NormalButton.vue"
import WindowTitleText from "@/components/text/WindowTitleText.vue"

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
      <WindowTitleText :title="modalTitle"></WindowTitleText>
      <slot name="modal-content"></slot>
      <div id="btn-container">
        <NormalButton id="save-btn-div">
          <span @click="reverseDisplayModal" class="button">Save</span>
        </NormalButton>
        <NormalButton id="close-btn-div">
          <span @click="reverseDisplayModal" class="button">Close</span>
        </NormalButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
#modal-container {
  display: v-bind(displayStatus);
  font-family: -apple-system, "Inter", serif;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 5%;
}

.button {
  font-weight: bold;
  top: auto;
  margin-left: auto;
}

#modal-content-container {
  background-color: var(--color-background-soft);
  width: 40%;
  border-radius: 2rem;
  padding: 1.3%;
  display: flex;
  flex-direction: column;
  text-align: left;
  height: min-content;
  border: 1px solid var(--color-border-very-soft);
}

#close-btn-div {
  width: min-content;
  margin-left: auto;
  align-self: flex-end;
  margin-top: auto;
}

#save-btn-div {
  margin-top: auto;
  margin-left: 0;
}

#btn-container {
  display: flex;
  position: relative;
  margin-top: 2rem;
}

#container {
  display: flex;
  flex-direction: row;
}

.button:hover {
  color: var(--color-text);
  cursor: pointer;
}

#modal-content-container {
  color: var(--color-text);
}

</style>