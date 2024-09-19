<template>
  <div
    v-if="routes.length > 0"
  >
    <div class="mb-4 flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
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
        class="flex flex-row items-center justify-between rounded border-b border-gray-200 p-2 hover:bg-gray-200 md:px-4 dark:border-gray-800 dark:hover:bg-gray-800"
      >
        <p class="font-bold md:text-lg">
          {{ route.name }}
          <span
            class="text-sm"
            :class="getRatingColor(getAverageRating(route.ratings))"
          >
            {{ getAverageRating(route.ratings) === -1 ? ' No ratings' : ` ${getAverageRating(route.ratings).toFixed(2)}` }}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ route.ratings.length > 0 ? ` ${route.ratings.length}` : '' }}
          </span>
        </p>
        <p class="font-semibold text-gray-700 md:text-lg dark:text-gray-200">
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
        v-if="page < sortedFilteredRoutes.length / 25 - 1"
        @click="page++"
      >
        Next
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoutesStore } from '~/stores/routes';
import { useSearchStore } from '~/stores/searchStore';

const routesStore = useRoutesStore();
const searchStore = useSearchStore();
const { routes } = storeToRefs(routesStore);
const { search, sort } = storeToRefs(searchStore);
const page = ref(0);
const route = useRoute();

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
      sortedRoutes.sort((a, b) => {
        const aRating = getAverageRating(a.ratings);
        const bRating = getAverageRating(b.ratings);
        if (aRating === -1) return 1;
        if (bRating === -1) return -1;
        return aRating - bRating;
      });
      break;
    case 'Rating (High-Low)':
      sortedRoutes.sort((a, b) => getAverageRating(b.ratings) - getAverageRating(a.ratings));
      break;
    case 'Distance (Low-High)':
      sortedRoutes.sort((a, b) => a.distance - b.distance);
      break;
    case 'Distance (High-Low)':
      sortedRoutes.sort((a, b) => b.distance - a.distance);
      break;
    case '# of Ratings (Low-High)':
      sortedRoutes.sort((a, b) => a.ratings.length - b.ratings.length);
      break;
    case '# of Ratings (High-Low)':
      sortedRoutes.sort((a, b) => b.ratings.length - a.ratings.length);
      break;
  }
  return sortedRoutes.filter(route => route.name.toLowerCase().includes(search.value.toLowerCase()));
});

const sortOptions = ['Name (A-Z)', 'Name (Z-A)', 'Rating (Low-High)', 'Rating (High-Low)', 'Distance (Low-High)', 'Distance (High-Low)', '# of Ratings (Low-High)', '# of Ratings (High-Low)'];

watch(search, () => {
  if (page.value > sortedFilteredRoutes.value.length / 25 - 1) {
    page.value = Math.floor(sortedFilteredRoutes.value.length / 25);
  }
});
</script>
