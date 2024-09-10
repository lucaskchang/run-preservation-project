export const useUserInfoStore = defineStore('userInfo', () => {
  function setUserInfo(user) {
    name.value = user.displayName;
    email.value = user.email;
    pfp.value = user.photoURL;
  }

  const name = ref('');
  const email = ref('');
  const pfp = ref('');

  return {
    setUserInfo,
    name,
    email,
    pfp,
  };
});
