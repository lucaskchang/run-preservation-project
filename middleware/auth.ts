export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCurrentUser();
  if (!user.value && to.path !== '/') {
    return navigateTo('/?redirect=' + to.path);
  }
});
