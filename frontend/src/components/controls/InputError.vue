<script setup lang="ts">
import BodyText from "@/components/text/BodyText.vue"
import type {V$} from "@/model/vuelidate"

defineProps<{
  v$: V$,
  field: string
}>()
</script>

<template>
  <div v-if="v$[field].$invalid">
    <div v-for="error in v$[field].$errors" :key="error.$uid">
      <BodyText class="err" font-size="0.9rem">{{ error.$message }}</BodyText>
    </div>
  </div>
</template>

<style scoped>
:deep(.err) {
  line-height: 1;
  margin: 0 0 0 0.5rem;
  color: var(--error-400);
}
</style>