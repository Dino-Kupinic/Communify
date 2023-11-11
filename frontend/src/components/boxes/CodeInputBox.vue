<script setup lang="ts">
import {ref} from "vue"

interface Props {
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "NUM?",
})

const number = ref()
const emit = defineEmits(["response"])

function sendNumber() {
  emit("response", number.value)
}

</script>

<template>
  <div class="form-group">
    <div id="formBorder">
      <input :placeholder="placeholder" maxlength="1" @input="sendNumber" v-model="number">
    </div>
  </div>

</template>

<style scoped>

.form-group {
  margin-left: 1rem;
  margin-right: 1rem;
}

input {
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 1px solid var(--neutral-700);
  border-radius: 5px;
  text-align: center;
  justify-content: center;
  align-content: center;
  height: 4em;
  width: 4em;
  margin: 5px 5%;
  max-width: 4em;
  max-height: 4em;
  font-weight: 550;
}
</style>