<script setup lang="ts">

</script>

<template>
  <div class="cards">
    <div class="infobox_inside">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.cards {
  position: relative;
  margin: 3% 3% 5%;
  width: 20rem;
  height: 8rem;
  background: var(--color-background);
  border-radius: 20px;
}

.infobox_inside {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
}

.cards:before,
.cards:after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  background: linear-gradient(45deg, #1825c0, #00fff7, #fd29fd, #8400ff);
  background-size: 400% 400%;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  border-radius: 20px;
  z-index: -1;
}

.cards:after {
  filter: blur(14px);
}
</style>