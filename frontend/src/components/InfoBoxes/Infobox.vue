<script setup lang="ts">

</script>

<template>
  <div class="cards">
    <slot>
    </slot>
  </div>
</template>

<style scoped>
.cards{
  position: relative;
  margin-top: 3%;
  margin-bottom: 5%;
  margin-left: 3%;
  margin-right: 3%;
  width: 350px;
  height: 200px;
  background: #010002;
  border-radius: 20px;
}

.cards:before,
.cards:after{
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  background: linear-gradient(45deg, #1825c0, #00fff7, #fd29fd,#8400ff);
  background-size: 400% 400%;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  border-radius: 20px;
  z-index: -1;
}

.cards:after {
  filter: blur(10px);
}
</style>