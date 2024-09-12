<template>
  <ClientOnly>
    <UToggle
      v-model="isDark"
      size="lg"
      class="mr-2"
      :off-icon="'i-heroicons-sun-20-solid'"
      :on-icon="'i-heroicons-moon-20-solid'"
    />
    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});
</script>
