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
        Total Ratings: {{ ratings.length }} | Avg. Rating: {{ (ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length).toFixed(2) }}
      </p>
    </div>
    <div class="mx-auto mt-8 flex flex-col justify-center space-x-8 md:w-2/3 md:flex-row 2xl:w-1/2">
      <div>
        <p class="text-2xl font-bold">
          All Ratings
        </p>
        <div
          v-for="rating in ratings"
          :key="rating.id"
        >
          <NuxtLink
            :to="`/routes/${rating.id}`"
          >
            <p
              class="mt-2 font-bold"
            >
              {{ rating.name }} <span class="font-normal text-gray-700 dark:text-gray-200"> {{ rating.date }}</span>
            </p>
            <p>
              Rating: <span
                class="font-bold"
                :class="getRatingColor(rating.rating)"
              >{{ rating.rating }}</span>
            </p>
          </NuxtLink>
        </div>
      </div>
      <div>
        <p class="text-2xl font-bold">
          Highest Rating
        </p>
        <NuxtLink
          :to="`/routes/${highestRating.id}`"
        >
          <p
            class="mt-2 font-bold"
          >
            {{ highestRating.name }} <span class="font-normal text-gray-700 dark:text-gray-200"> {{ highestRating.date }}</span>
          </p>
          <p>
            Rating: <span
              class="font-bold"
              :class="getRatingColor(highestRating.rating)"
            >{{ highestRating.rating }}</span>
          </p>
        </NuxtLink>
        <p class="mt-4 text-2xl font-bold">
          Lowest Rating
        </p>
        <NuxtLink
          :to="`/routes/${lowestRating.id}`"
        >
          <p
            class="mt-2 font-bold"
          >
            {{ lowestRating.name }} <span class="font-normal text-gray-700 dark:text-gray-200"> {{ lowestRating.date }}</span>
          </p>
          <p>
            Rating: <span
              class="font-bold"
              :class="getRatingColor(lowestRating.rating)"
            >{{ lowestRating.rating }}</span>
          </p>
        </NuxtLink>
      </div>
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

const ratings = computed(() => {
  const ratings = [];
  for (const route of routes.value) {
    for (const rating of route.ratings) {
      if (rating.user === email) {
        if (rating.rating !== -1) {
          ratings.push({
            name: route.name,
            id: route.id,
            date: new Date(rating.date).toLocaleDateString(),
            rating: rating.rating,
          });
        }
      }
    }
  }
  return ratings;
});

const highestRating = computed(() => {
  let highest = { rating: -1 };
  for (const rating of ratings.value) {
    if (rating.rating > highest.rating) {
      highest = rating;
    }
  }
  return highest;
});

const lowestRating = computed(() => {
  let lowest = { rating: 6 };
  for (const rating of ratings.value) {
    if (rating.rating < lowest.rating) {
      lowest = rating;
    }
  }
  return lowest;
});
</script>
