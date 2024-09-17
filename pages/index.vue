<template>
  <div class="flex h-screen flex-col items-center justify-center text-center text-gray-950 transition duration-300 ease-in-out dark:bg-gray-950 dark:text-white">
    <p class="text-6xl font-bold">
      Run Preservation Project Ratings
    </p>
    <p class="mt-4 text-2xl">
      Rate all the routes on the RPP
    </p>
    <UButton
      icon="i-mdi-google"
      class="mt-4 px-4 py-2 font-bold"
      @click="login"
    >
      Login to Get Started
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useUsersStore } from '~/stores/users';

const user = useCurrentUser();
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);
const route = useRoute();

function login() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(async () => {
      if (!users.value.find(userTemp => userTemp.email === user.value.email)) {
        const db = useFirestore();
        const usersCollection = collection(db, 'users');
        await addDoc(usersCollection, {
          email: user.value.email,
          name: user.value.displayName,
          pfp: user.value.photoURL,
        });
      }
      navigateTo('/home');
    });
}

watch(() => user.value, (value) => {
  if (value) {
    if (route.query.redirect) {
      navigateTo(route.query.redirect as string);
    }
    else {
      navigateTo('/home');
    }
  }
});

onMounted(() => {
  if (user.value) {
    if (route.query.redirect) {
      navigateTo(route.query.redirect as string);
    }
    else {
      navigateTo('/home');
    }
  }
});

definePageMeta({
  layout: false,
});
</script>
