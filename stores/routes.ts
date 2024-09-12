import { useFirestore } from 'vuefire';
import { collection } from 'firebase/firestore';

export const useRoutesStore = defineStore('routes', () => {
  const db = useFirestore();
  const routesCollection = collection(db, 'routes');
  const routes = useCollection(routesCollection);

  return {
    routes,
  };
});
