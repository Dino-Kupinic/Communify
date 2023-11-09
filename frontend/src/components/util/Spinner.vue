<script setup lang="ts">

</script>

<template>
  <span class="loader"></span>
  <slot></slot>
</template>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
  border-width: 3px 2px 3px 2px;
  border-style: solid dotted solid dotted;
  border-color: var(--gradient-200) rgba(255, 255, 255, 0.3) var(--gradient-800) rgba(80, 65, 59, 0.3);
  border-radius: 50%;
  box-sizing: border-box;
  animation: 1s rotate linear infinite;
}

.loader:before, .loader:after {
  content: '';
  top: 0;
  left: 0;
  position: absolute;
  border: 10px solid transparent;
  border-bottom-color: var(--gradient-800);
  transform: translate(-10px, 19px) rotate(-35deg);
}

.loader:after {
  border-color: var(--gradient-200) #0000 #0000 #0000;
  transform: translate(32px, 3px) rotate(-35deg);
}

@keyframes rotate {
  100% {
    transform: rotate(360deg)
  }
}
</style>