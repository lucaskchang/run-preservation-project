<template>
  <div class="p-4 md:p-12">
    <Route
      v-if="routes[0]"
      :route="routes[0]"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoutesStore } from '~/stores/routes';

const routesStore = useRoutesStore();
const { routes } = storeToRefs(routesStore);
</script>
