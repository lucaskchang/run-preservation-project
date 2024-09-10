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
import { useUserInfoStore } from '~/stores/userInfo';
import { useRoutesStore } from '~/stores/routes';

const routesStore = useRoutesStore();
const userInfoStore = useUserInfoStore();

const provider = new GoogleAuthProvider();

function login() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      userInfoStore.setUserInfo(user);
      navigateTo('/home');
    }).catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  routesStore.getRoutes();
});

definePageMeta({
  layout: false,
});
</script>
