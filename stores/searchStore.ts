export const useSearchStore = defineStore('search', () => {
  const search = ref('');
  const sort = ref('Rating (High-Low)');
  const page = ref(0);

  return {
    search,
    sort,
    page,
  };
});
