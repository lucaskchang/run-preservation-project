<template>
  <div>
    <div
      v-if="route"
      class="mx-auto space-y-4 text-center md:w-2/3 2xl:w-1/3"
    >
      <div>
        <p class="text-4xl font-bold">
          {{ route.name }}
        </p>
        <p class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          {{ route.region }} | {{ route.distance }} miles | Avg. Rating: <span
            class="font-bold"
            :class="getRatingColor(getAverageRating(route.ratings))"
          >
            {{ getAverageRating(route.ratings) === -1 ? 'No ratings' : getAverageRating(route.ratings).toFixed(2) }}
          </span>
        </p>
      </div>
      <iframe
        v-if="route.link !== '#N/A'"
        :src="route.link"
        class="h-96 w-full rounded-lg"
      />
      <div
        v-else
        class="flex h-96 w-full items-center justify-center rounded-lg text-2xl font-bold ring-2 ring-gray-300 dark:ring-gray-700"
      >
        No preview available
      </div>
      <p class="text-lg italic text-gray-700 dark:text-gray-200">
        {{ route.notes }}
      </p>
      <div class="flex flex-row items-center space-x-4 md:mx-12">
        <URange
          v-model="rating"
          size="2xl"
          :min="0"
          :max="100"
        />
        <p>
          Your rating: <span
            class="font-bold"
            :class="getRatingColor(rating)"
          >{{ rating === -1 ? 'No rating' : rating }}</span>
        </p>
      </div>
      <div class="text-left">
        <p class="text-2xl font-bold">
          Ratings
        </p>
        <div
          v-for="review in populatedRatings"
          :key="review.user.email"
        >
          <NuxtLink
            v-if="review.rating !== -1"
            :to="`/users/${review.user.email}`"
            class="mt-2"
          >
            <div class="flex flex-row items-center justify-between rounded border-b border-gray-200 px-2 py-3 hover:bg-gray-200 dark:border-gray-800 dark:hover:bg-gray-800">
              <div class="flex flex-row space-x-2">
                <img
                  :src="review.user.pfp"
                  alt="Profile Picture"
                  class="size-12 rounded-full"
                >
                <div class="flex flex-col justify-center">
                  <p class="font-bold">
                    {{ review.user.name }} <span class="text-sm font-normal text-gray-700 dark:text-gray-200"> {{ new Date(review.date).toLocaleString() }}</span>
                  </p>
                  <p
                    class="-mt-1 text-gray-600 dark:text-gray-300"
                  >
                    {{ review.user.email }}
                  </p>
                </div>
              </div>
              <p>
                Rating: <span
                  class="font-bold"
                  :class="getRatingColor(review.rating)"
                >{{ review.rating }}</span>
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-4xl font-bold">
        Loading...
      </p>
      <p class="text-center text-2xl">
        If this takes too long, please refresh the page.
      </p>
    </div>
    <BackButton />
  </div>
</template>

<script setup lang="ts">
import { useFirestore } from 'vuefire';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useUsersStore } from '~/stores/users';

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);
const path = useRoute();
const user = useCurrentUser();
const rating = ref(-1);
const db = useFirestore();
const routesCollection = collection(db, 'routes');
const routes = useCollection(routesCollection);

const route = computed(() => {
  const foundRoute = routes.value.find(route => route.id === path.params.id);
  if (!foundRoute) return null;

  rating.value = foundRoute.ratings.find(rating => rating.user === user.value.email)?.rating ?? -1;
  return foundRoute;
});

const populatedRatings = computed(() => {
  const output = [];
  for (const rating of route.value.ratings) {
    const foundUser = users.value.find(user => user.email === rating.user);
    output.push({
      ...rating,
      user: foundUser
        ? foundUser
        : {
          name: 'Unknown',
          email: rating.user,
          pfp: '/default-pfp.png',
        },
    });
  }
  return output;
});

watchDebounced(rating, async (value, oldValue) => {
  if (value === oldValue || oldValue === -1) return;
  console.log (oldValue, value);
  const docRef = doc(routesCollection, route.value.id);
  await updateDoc(docRef, {
    ratings: [
      ...route.value.ratings.filter(rating => rating.user !== user.value.email),
      {
        rating: value,
        date: new Date().toISOString(),
        user: user.value.email,
      },
    ],
  });
}, { debounce: 500, maxWait: 2500 });
</script>
