<template>
  <div class="flex h-screen flex-col items-center justify-center text-center text-gray-950 transition duration-300 ease-in-out dark:bg-gray-950 dark:text-white">
    <p class="text-5xl font-bold">
      RPP Ratings
    </p>
    <UButton
      icon="i-mdi-google"
      class="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      @click="login"
    >
      Login with Google
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const user = useCurrentUser();

function login() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(() => {
      navigateTo('/home');
    }).catch((error) => {
      console.log(error);
    });
}

watch(() => user.value, (value) => {
  if (value) {
    console.log('User is logged in');
    navigateTo('/home');
  }
});

definePageMeta({
  layout: false,
});
</script>
