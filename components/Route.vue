<template>
  <div class="mx-auto w-full space-y-4 text-center md:w-2/3 2xl:w-1/2">
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
        Your rating: {{ rating }}
      </p>
    </div>
    <div class="space-y-2">
      <p class="text-2xl font-bold">
        Other Ratings
      </p>
      <div
        v-for="review in props.route.ratings"
        :key="review.user"
        class="text-left"
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
</template>

<script setup lang="ts">
import { useFirestore } from 'vuefire';
import { collection, getDoc, setDoc, doc } from 'firebase/firestore';
import { useUserInfoStore } from '~/stores/userInfo';

const userInfoStore = useUserInfoStore();
const { email } = storeToRefs(userInfoStore);
const db = useFirestore();
const rating = ref(0);

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

watchDebounced(rating, async (value) => {
  console.log(value);
  const routesCollection = collection(db, 'routes');
  const docRef = doc(routesCollection, props.route.id);
  const docInfo = await getDoc(docRef);
  const data = docInfo.data();
  const ratings = data.ratings;
  // add rating if rating from email doesn't exist
  const index = ratings.findIndex(rating => rating.user === email.value);
  if (index === -1) {
    ratings.push({
      rating: value,
      user: email.value,
    });
  }
  else {
    ratings[index].rating = value;
  }
  await setDoc(docRef, {
    ...data,
    ratings,
  });
}, { debounce: 1000, maxWait: 5000 });
</script>
