<template>
  <div
    v-if="routes.length > 0"
    class="p-4 md:p-8"
  >
    <div
      v-for="route in routes.slice(page * 25, page * 25 + 25)"
      :key="route.id"
    >
      <NuxtLink
        :to="`/routes/${route.id}`"
        class="flex flex-row items-center justify-between border-b border-gray-200 px-4 py-2 dark:border-gray-800"
      >
        <p class="text-lg font-bold">
          {{ route.name }}
          <span
            class="text-sm"
            :class="getRatingColor(averageRating(route.ratings))"
          >
            {{ averageRating(route.ratings) }}
          </span>
        </p>
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {{ route.region }} | {{ route.distance }} miles
        </p>
      </Nuxtlink>
    </div>
    <div class="mt-4 flex flex-row items-center justify-between">
      <UButton
        v-if="page > 0"
        @click="page--"
      >
        Previous
      </UButton>
      <p>
        Page {{ page + 1 }}
      </p>
      <UButton
        v-if="page < routes.length / 25 - 1"
        @click="page++"
      >
        Next
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoutesStore } from '~/stores/routes';

const ratingColorKey = {
  20: 'text-red-700',
  40: 'text-red-500',
  60: 'text-yellow-500',
  80: 'text-green-500',
  100: 'text-green-700',
};

const routesStore = useRoutesStore();
const { routes } = storeToRefs(routesStore);
const page = ref(0);
function averageRating(ratings) {
  const avg = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
  return avg ? avg.toFixed(2) : 'No ratings';
}

function getRatingColor(rating) {
  if (rating === 'No ratings') {
    return 'text-gray-700 dark:text-gray-200';
  }
  return Object.entries(ratingColorKey)
    .find(([key]) => Math.round(rating) <= key)
    ?.[1];
}
</script>
