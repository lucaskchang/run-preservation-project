<template>
  <div class="sticky top-full p-8 text-center font-semibold">
    <p>
      Created by Lucas Chang. Runs from the <a
        href="https://docs.google.com/spreadsheets/d/1135ktpKIBJYM-cE2h3R4gzblRnhXbqtjQ9nRT8SlGaY/edit?gid=0#gid=0"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-500 hover:text-blue-700"
      >RPP</a>.
    </p>
  </div>
</template>

<!--
<script setup lang="ts">
import { collection, addDoc, updateDoc, getDocs } from 'firebase/firestore';
import routes from '~/assets/data/routes.json';

const db = useFirestore();
const routesCollection = collection(db, 'routes');

onMounted(async () => {
  if ((await getDocs(routesCollection)).empty) {
    let count = 0;
    for (const route of routes) {
      const routeDocRef = await addDoc(routesCollection, {
        ...route,
        ratings: [],
      });
      await updateDoc(routeDocRef, {
        id: routeDocRef.id,
      });
      count++;
      console.log(`Document ${count} added with ID: ${routeDocRef.id}`);
    }
  }
});
</script>
-->
