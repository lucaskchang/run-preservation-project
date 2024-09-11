<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRoutesStore } from '~/stores/routes';

const routesStore = useRoutesStore();

onMounted(() => {
  routesStore.getRoutes();
});
</script>
