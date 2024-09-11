import { useFirestore } from 'vuefire';
import { collection, getDocs } from 'firebase/firestore';

export const useRoutesStore = defineStore('routes', () => {
  const db = useFirestore();
  const routesCollection = collection(db, 'routes');
  const routes = ref([]);
  const reactiveRoutes = useCollection(routesCollection);
  async function getRoutes() {
    const querySnapshot = await getDocs(routesCollection);
    querySnapshot.forEach((doc) => {
      routes.value.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  }

  return {
    routes,
    reactiveRoutes,
    getRoutes,
  };
});
