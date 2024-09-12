<template>
  <div class="flex flex-row justify-center space-x-2 p-4 md:space-x-12">
    <div class="flex flex-col justify-center">
      <UButton
        icon="i-mdi-menu-left"
        size="xl"
        @click="index = index === 0 ? routes.length - 1 : index - 1"
      />
    </div>
    <Route
      v-if="routes.length"
      :route="routes[index]"
      class="md:w-2/3 2xl:w-1/2"
    />
    <div class="flex flex-col justify-center">
      <UButton
        icon="i-mdi-menu-right"
        size="xl"
        @click="index = index === routes.length - 1 ? 0 : index + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoutesStore } from '~/stores/routes';

const routesStore = useRoutesStore();
const { routes } = storeToRefs(routesStore);
const index = ref(0);
</script>
