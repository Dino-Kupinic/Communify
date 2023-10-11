<script setup lang="ts">

</script>

<template>
<div id="UserInputContainer">
  <input id="UserInput" placeholder="Send Messages">
  <button id="sendBtn">➜</button>
</div>
</template>

<style scoped>
#UserInput {
  width: 80%;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  background-color: var(--color-background);
  padding: 1%;
  border-radius: 10rem;
}

#UserInputContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  top: 100%;
}

#sendBtn {
  margin-left: 2%;
  margin-right: 2%;
  width: 33.4px;
  height: 33.4px;
  font-size: 150%;
  border-radius: 50%;
  background-color: var(--color-background);
  color: var(--color-border-very-soft);
  justify-content: center;
}
</style>