<script setup lang="ts">

</script>

<template>
<div id="UserInputContainer">
  <input id="UserInput" placeholder="Send Message">
</div>
</template>

<style scoped>
#UserInput {
  width: 100%;
  border: 1px solid var(--color-border-soft);
  color: var(--color-text);
  background-color: var(--color-background);
  padding: 0.5%;
  border-radius: 10rem;
}

#UserInputContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  top: 100%;
}

#sendBtn {
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 1rem;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background-color: var(--color-background);
  color: var(--color-border-very-soft);
  justify-content: center;
}
</style>