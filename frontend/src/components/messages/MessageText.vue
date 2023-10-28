<script setup lang="ts">
import {onMounted, ref} from "vue"
import {inject} from "vue"

const messageStyle = ref<string>("")
const messageType = inject("messageType")

onMounted(() => {
  if (messageType === "from-them") {
    messageStyle.value = "from-them"
  } else {
    messageStyle.value = "from-me"
  }
})
</script>

<template>
  <p :class="messageStyle">
    <slot></slot>
  </p>
</template>

<style scoped>
p {
  border-radius: 1.15rem;
  line-height: 1.25;
  max-width: 75%;
  padding: 0.5rem .875rem;
  position: relative;
  word-wrap: break-word;
  font-weight: 500;
}

p::before,
p::after {
  bottom: -0.1rem;
  content: "";
  height: 1rem;
  position: absolute;
}

p.from-me {
  align-self: flex-end;
  background-color: var(--brand-500);
  color: var(--neutral-100);
}

p.from-me::before {
  border-bottom-left-radius: 0.8rem 0.7rem;
  border-right: 1rem solid var(--brand-500);
  right: -0.35rem;
  transform: translate(0, -0.1rem);
}

p.from-me::after {
  background-color: var(--color-background-soft);
  border-bottom-left-radius: 0.5rem;
  right: -40px;
  transform: translate(-30px, -2px);
  width: 10px;
}

p[class^="from-"] {
  margin: 0.5rem 0;
  width: fit-content;
}

p.from-me ~ p.from-me {
  margin: 0.25rem 0 0;
}

p.from-me ~ p.from-me:not(:last-child) {
  margin: 0.25rem 0 0;
}

p.from-me ~ p.from-me:last-child {
  margin-bottom: 0.5rem;
}

p.from-them {
  align-items: flex-start;
  background-color: var(--neutral-100);
  color: var(--neutral-1000);
}

p.from-them:before {
  border-bottom-right-radius: 0.8rem 0.7rem;
  border-left: 1rem solid var(--neutral-100);
  left: -0.35rem;
  transform: translate(0, -0.1rem);
}

p.from-them::after {
  background-color: var(--color-background-soft);
  border-bottom-right-radius: 0.5rem;
  left: 20px;
  transform: translate(-30px, -2px);
  width: 10px;
}


</style>