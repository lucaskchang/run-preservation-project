import { useFirestore } from 'vuefire';
import { collection, getDocs } from 'firebase/firestore';

export const useRoutesStore = defineStore('routes', () => {
  const db = useFirestore();
  const routesCollection = collection(db, 'routes');
  const routes = ref([]);
  async function getRoutes() {
    const querySnapshot = await getDocs(routesCollection);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      routes.value.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  }

  return {
    routes,
    getRoutes,
  };
});
