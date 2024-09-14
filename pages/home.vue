<template>
  <div
    v-if="routes.length > 0"
  >
    <div class="mb-4 flex flex-row items-center justify-between">
      <UInput
        v-model="search"
        leading-icon="i-mdi-magnify"
        placeholder="Search for a route..."
        class="w-full md:w-1/3"
      />
      <USelect
        v-model="sort"
        leading-icon="i-mdi-sort-variant"
        :options="sortOptions"
        class="w-full md:w-1/4 lg:w-1/5"
      />
    </div>
    <div
      v-for="route in sortedFilteredRoutes.slice(page * 25, page * 25 + 25)"
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
            {{ averageRating(route.ratings) === -1 ? 'No ratings' : averageRating(route.ratings).toFixed(2) }}
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
  return avg ? avg : -1;
}

const sortedFilteredRoutes = computed(() => {
  const sortedRoutes = [...routes.value];
  switch (sort.value) {
    case 'Name (A-Z)':
      sortedRoutes.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'Name (Z-A)':
      sortedRoutes.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'Rating (Low-High)':
      sortedRoutes.sort((a, b) => averageRating(a.ratings) - averageRating(b.ratings));
      break;
    case 'Rating (High-Low)':
      sortedRoutes.sort((a, b) => averageRating(b.ratings) - averageRating(a.ratings));
      break;
    case 'Distance (Low-High)':
      sortedRoutes.sort((a, b) => a.distance - b.distance);
      break;
    case 'Distance (High-Low)':
      sortedRoutes.sort((a, b) => b.distance - a.distance);
      break;
  }
  return sortedRoutes.filter(route => route.name.toLowerCase().includes(search.value.toLowerCase()));
});

function getRatingColor(rating: number) {
  if (rating === -1) {
    return 'text-gray-700 dark:text-gray-200';
  }
  return Object.entries(ratingColorKey)
    .find(([key]) => Math.round(rating) <= parseInt(key))
    ?.[1];
}

const sortOptions = ['Name (A-Z)', 'Name (Z-A)', 'Rating (Low-High)', 'Rating (High-Low)', 'Distance (Low-High)', 'Distance (High-Low)'];
const sort = ref('Rating (High-Low)');
const search = ref('');
</script>
