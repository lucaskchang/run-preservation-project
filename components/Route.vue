<template>
  <div class="space-y-4 text-center">
    <div>
      <p class="text-4xl font-bold">
        {{ props.route.name }}
      </p>
      <p class="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {{ props.route.region }} | {{ props.route.distance }} miles
      </p>
    </div>
    <iframe
      :src="props.route.link"
      class="h-96 w-full rounded-lg"
    />
    <p class="text-lg italic text-gray-700 dark:text-gray-200">
      {{ props.route.notes }}
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
        v-for="review in props.route.ratings"
        :key="review.user"
      >
        <div
          v-if="review.rating !== -1"
          class="mt-2"
        >
          <p class="font-bold">
            {{ review.user }}
          </p>
          <p>
            Rating: {{ review.rating }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFirestore } from 'vuefire';
import { collection, getDoc, setDoc, doc } from 'firebase/firestore';

const props = defineProps<{
  route: {
    id: string
    name: string
    region: string
    distance: number
    link: string
    notes?: string
    ratings: {
      rating: number
      user: string
    }[]
  }
}>();

const user = useCurrentUser();
const db = useFirestore();
const routesCollection = collection(db, 'routes');
const rating = ref(-1);

watchDebounced(rating, async (value) => {
  const docRef = doc(routesCollection, props.route.id);
  const docInfo = await getDoc(docRef);
  const data = docInfo.data();
  const ratings = data.ratings;
  const index = ratings.findIndex(rating => rating.user === user.value.email);
  if (index === -1) {
    ratings.push({
      rating: value,
      user: user.value.email,
    });
  }
  else {
    ratings[index].rating = value;
  }
  await setDoc(docRef, {
    ...data,
    ratings,
  });
}, { debounce: 500, maxWait: 2500 });

watch(() => props.route, () => {
  rating.value = props.route.ratings.find(rating => rating.user === user.value.email)?.rating ?? -1;
});

onMounted(async () => {
  rating.value = props.route.ratings.find(rating => rating.user === user.value.email)?.rating ?? -1;
});
</script>
