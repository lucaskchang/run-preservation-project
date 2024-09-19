export const useSearchStore = defineStore('search', () => {
  const search = ref('');
  const sort = ref('Rating (High-Low)');

  return {
    search,
    sort,
  };
});
