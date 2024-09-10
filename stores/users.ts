export const useRoutesStore = defineStore('routes', () => {
  const users = ref([]);

  return {
    users,
  };
});
