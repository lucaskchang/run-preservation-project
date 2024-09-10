<template>
  <div class="flex w-full flex-row items-center justify-between px-6 py-4">
    <div class="flex flex-row">
      <img
        :src="pfp"
        alt="Profile Picture"
        class="size-12 rounded-full"
      >
      <div class="ml-2 flex flex-col justify-center">
        <p class="font-bold">
          {{ name }}
        </p>
        <p class="-mt-1 text-gray-600 dark:text-gray-300">
          {{ email }}
        </p>
      </div>
    </div>
    <ColorMode />
  </div>
</template>

<script setup lang="ts">
import { useUserInfoStore } from '~/stores/userInfo';

const userInfoStore = useUserInfoStore();
const { name, email, pfp } = storeToRefs(userInfoStore);
</script>
