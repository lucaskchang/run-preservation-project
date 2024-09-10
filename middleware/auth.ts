import { useUserInfoStore } from '~/stores/userInfo';

export default defineNuxtRouteMiddleware((to, from) => {
  const userInfoStore = useUserInfoStore();
  if (!userInfoStore.name && to.path !== '/') {
    return navigateTo('/');
  }
});
