<template>
  <div>
    <div class="mx-auto flex w-fit flex-col items-center">
      <img
        :src="user.pfp"
        alt="Profile Picture"
        class="size-20 rounded-full"
      >
      <p class="text-3xl font-bold">
        {{ user.name }}
      </p>
      <p class="-mt-1 text-xl text-gray-600 dark:text-gray-300">
        {{ user.email }}
      </p>
      <p>
        Total Ratings: <span class="font-bold">{{ ratings.length }}</span> | Avg. Rating:
        <span
          class="font-bold"
          :class="getRatingColor(ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length)"
        >
          {{ (ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length).toFixed(2) }}
        </span>
      </p>
    </div>
    <div class="mt-4 flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
      <p class="text-2xl font-bold">
        Ratings
      </p>
      <USelect
        v-model="sort"
        leading-icon="i-mdi-sort-variant"
        :options="sortOptions"
        class="w-full md:w-1/4 lg:w-1/5"
      />
    </div>
    <div
      v-for="rating in ratings.slice(page * 25, page * 25 + 25)"
      :key="rating.id"
    >
      <NuxtLink
        :to="`/routes/${rating.id}`"
        class="flex flex-row items-center justify-between rounded border-b border-gray-200 p-2 hover:bg-gray-200 md:px-4 dark:border-gray-800 dark:hover:bg-gray-800"
      >
        <p class="font-bold md:text-lg">
          {{ rating.name }}
          <span
            class="text-sm"
            :class="getRatingColor(rating.rating)"
          >
            {{ rating.rating }}
          </span>
        </p>
        <p class="font-semibold text-gray-700 dark:text-gray-200">
          {{ rating.date }}
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
        v-if="page < ratings.length / 25 - 1"
        @click="page++"
      >
        Next
      </UButton>
    </div>
    <BackButton />
  </div>
</template>

<script setup lang="ts">
import { useRoutesStore } from '~/stores/routes';
import { useUsersStore } from '~/stores/users';

const routesStore = useRoutesStore();
const usersStore = useUsersStore();
const { routes } = storeToRefs(routesStore);
const { users } = storeToRefs(usersStore);
const path = useRoute();
const email = path.params.user;
const user = computed(() => {
  const foundUser = users.value.find(user => user.email === email);
  return foundUser ? foundUser : { name: 'Unknown' };
});
const page = ref(0);
const sortOptions = ['Rating (Low-High)', 'Rating (High-Low)', 'Date (Old-New)', 'Date (New-Old)'];
const sort = ref('Date (New-Old)');

const ratings = computed(() => {
  const ratings = [];
  for (const route of routes.value) {
    for (const rating of route.ratings) {
      if (rating.user === email) {
        if (rating.rating !== -1) {
          ratings.push({
            name: route.name,
            id: route.id,
            date: new Date(rating.date).toLocaleString(),
            rating: rating.rating,
          });
        }
      }
    }
  }
  switch (sort.value) {
    case 'Rating (Low-High)':
      ratings.sort((a, b) => a.rating - b.rating);
      break;
    case 'Rating (High-Low)':
      ratings.sort((a, b) => b.rating - a.rating);
      break;
    case 'Date (Old-New)':
      ratings.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'Date (New-Old)':
      ratings.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
  }
  return ratings;
});
</script>
