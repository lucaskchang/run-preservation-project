<template>
  <p>
    {{ ratings }}
  </p>
</template>

<script setup lang="ts">
import { useRoutesStore } from '~/stores/routes';

const routesStore = useRoutesStore();
const { routes } = storeToRefs(routesStore);
const path = useRoute();
const email = path.params.email;

const ratings = computed(() => {
  const ratings = [];
  for (const route of routes.value) {
    for (const rating of route.ratings) {
      if (rating.user === email) {
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
