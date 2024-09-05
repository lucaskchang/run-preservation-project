<template>
  <div>
    <p class="text-2xl font-bold">
      {{ run["Name"] }}
    </p>
    <ColorMode />
  </div>
</template>

<script setup lang="ts">
import runs from '~/assets/data/runs.json';

const index = ref(0);
const run = computed(() => runs[index.value]);
</script>
