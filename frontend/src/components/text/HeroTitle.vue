<script setup lang="ts">

interface Props {
  fontFamily?: string
}

withDefaults(defineProps<Props>(), {
  fontFamily : "Inter"
})

</script>

<template>
    <p>
      <slot>
      </slot>
    </p>
</template>

<style scoped>
    p {
      font-family: v-bind(fontFamily);
      font-size: 7em;
      text-align: center;
      margin-top: 2em;
      padding-bottom: 0.3em;
      font-weight: 700;
      background: linear-gradient(90deg,#00dbde, #fc00ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

    }
</style>