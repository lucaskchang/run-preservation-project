<template :class="$colorMode.value">
  <div
    class="min-h-screen text-gray-950 transition duration-300 ease-in-out dark:bg-gray-950 dark:text-white"
  >
    <Header />
    <div class="p-4 md:p-8">
      <slot />
    </div>
    <Footer />
  </div>
</template>
