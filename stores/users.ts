import { useFirestore } from 'vuefire';
import { collection } from 'firebase/firestore';

export const useUsersStore = defineStore('users', () => {
  const db = useFirestore();
  const usersCollection = collection(db, 'users');
  const users = useCollection(usersCollection);

  return {
    users,
  };
});
