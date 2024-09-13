<template>
  <p>
    {{ ratings }}
  </p>
</template>

<script setup lang="ts">
import { useRoutesStore } from '~/stores/routes';

const routesStore = useRoutesStore();
const { routes } = storeToRefs(routesStore);
const user = useCurrentUser();

const ratings = computed(() => {
  const ratings = [];
  for (const route of routes.value) {
    for (const rating of route.ratings) {
      if (rating.user === user.value?.email) {
        if (rating.rating !== -1) {
          ratings.push({
            route: route.name,
            date: new Date(rating.date).toLocaleDateString(),
            rating: rating.rating,
          });
        }
      }
    }
  }
  return ratings;
});
</script>
