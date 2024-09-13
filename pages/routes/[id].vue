<template>
  <div
    v-if="route"
    class="mx-auto space-y-4 text-center md:w-2/3 2xl:w-1/3"
  >
    <div>
      <p class="text-4xl font-bold">
        {{ route.name }}
      </p>
      <p class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {{ route.region }} | {{ route.distance }} miles
      </p>
    </div>
    <iframe
      :src="route.link"
      class="h-96 w-full rounded-lg"
    />
    <p class="text-lg italic text-gray-700 dark:text-gray-200">
      {{ route.notes }}
    </p>
    <div class="flex flex-row items-center space-x-4 md:mx-12">
      <URange
        v-model="rating"
        :min="0"
        :max="100"
      />
      <p>
        Your rating: {{ rating === -1 ? 'N/A' : rating }}
      </p>
    </div>
    <div class="text-left">
      <p class="text-2xl font-bold">
        Ratings
      </p>
      <div
        v-for="review in route.ratings"
        :key="review.user"
      >
        <div
          v-if="review.rating !== -1"
          class="mt-2"
        >
          <p class="font-bold">
            {{ review.user }} <span class="font-normal text-gray-700 dark:text-gray-200"> {{ new Date(review.date).toLocaleDateString() }}</span>
          </p>
          <p>
            Rating: {{ review.rating }}
          </p>
        </div>
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
</template>

<script setup lang="ts">
import { useFirestore } from 'vuefire';
import { collection, doc, updateDoc } from 'firebase/firestore';

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

watchDebounced(rating, async (value) => {
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
