<template>
  <div>
    <div
      v-for="user in usersWithInfo.slice(page * 25, page * 25 + 25)"
      :key="user.email"
    >
      <NuxtLink
        :to="`/users/${user.email}`"
        class="flex flex-row items-center justify-between rounded border-b border-gray-200 p-2 hover:bg-gray-200 md:px-4 dark:border-gray-800 dark:hover:bg-gray-800"
      >
        <div class="flex flex-row items-center space-x-2">
          <img
            :src="user.pfp"
            class="size-10 rounded-full"
          >
          <div class="flex flex-col">
            <p class="font-bold md:text-lg">
              {{ user.name }}
            </p>
            <p class="-mt-1 text-sm text-gray-700 dark:text-gray-200">
              {{ user.email }}
            </p>
          </div>
        </div>
        <p class="font-bold">
          {{ user.routes }} |
          <span
            class="text-sm"
            :class="getRatingColor(user.average)"
          >
            {{ user.average.toFixed(2) !== 'NaN' ? user.average.toFixed(2) : 'N/A' }}
          </span>
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
        v-if="page < users.length / 25 - 1"
        @click="page++"
      >
        Next
      </UButton>
    </div>
    <BackButton />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/stores/users';
import { useRoutesStore } from '~/stores/routes';

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);
const routesStore = useRoutesStore();
const { routes } = storeToRefs(routesStore);
const page = ref(0);

const usersWithInfo = computed(() => {
  return users.value.map((user) => {
    let numOfRoutes = 0;
    let average = 0;
    for (const route of routes.value) {
      for (const rating of route.ratings) {
        if (rating.user === user.email) {
          numOfRoutes++;
          average += rating.rating;
        }
      }
    }
    return {
      ...user,
      routes: numOfRoutes,
      average: average / numOfRoutes,
    };
  });
});
</script>
