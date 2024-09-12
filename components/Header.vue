<template>
  <div class="flex w-full flex-row items-center justify-between px-4 py-2">
    <NuxtLink to="/account">
      <div class="flex flex-row rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
        <img
          :src="userInfo.pfp"
          alt="Profile Picture"
          class="size-12 rounded-full"
        >
        <div class="ml-2 flex flex-col justify-center">
          <p class="font-bold">
            {{ userInfo.username }}
          </p>
          <p class="-mt-1 text-gray-600 dark:text-gray-300">
            {{ userInfo.email }}
          </p>
        </div>
      </div>
    </NuxtLink>
    <ColorMode />
  </div>
</template>

<script setup lang="ts">
const user = useCurrentUser();

const userInfo = computed(() => {
  if (user.value) {
    return {
      pfp: user.value.photoURL,
      username: user.value.displayName,
      email: user.value.email,
    };
  }
  return {
    pfp: '/default-pfp.png',
    username: 'Anonymous',
    email: '',
  };
});
</script>
