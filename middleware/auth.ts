export default defineNuxtRouteMiddleware((to) => {
  const user = useCurrentUser();
  console.log('user', user.value);
  if (!user.value && to.path !== '/') {
    return navigateTo('/');
  }
});
