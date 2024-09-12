export default defineNuxtRouteMiddleware((to) => {
  const user = useCurrentUser();
  if (!user.value && to.path !== '/') {
    return navigateTo('/');
  }
});
