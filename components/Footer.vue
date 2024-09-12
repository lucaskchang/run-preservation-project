<template>
  <div class="sticky top-full p-8 text-center font-semibold">
    <p>Created by Lucas Chang</p>
  </div>
</template>

<!--
add id to routes
<script setup lang="ts">
import { useFirestore } from 'vuefire';
import { collection, getDocs, setDoc } from 'firebase/firestore';

const db = useFirestore();
const routesCollection = collection(db, 'routes');

const docs = await getDocs(routesCollection);
docs.forEach(async (doc) => {
  await setDoc(doc.ref, {
    ...doc.data(),
    id: doc.id,
  });
});
</script>
-->

<!--
script to add routes to firestore
<script setup lang="ts">
import { collection, addDoc } from 'firebase/firestore';
import routes from '~/assets/data/routes.json';

const db = useFirestore();

const routesCollection = collection(db, 'routes');

onMounted(async () => {
  for (const route of routes) {
    const docRef = await addDoc(routesCollection, {
      ...route,
      ratings: [],
    });
    console.log('Document written with ID: ', docRef.id);
  }
});
</script>
-->
