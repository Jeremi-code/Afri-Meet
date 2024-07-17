import { defineStore } from 'pinia';
import { computed } from 'vue';


export const useAuthStore = defineStore('authStore', () => {
  const authCookie = useCookie<{ token: string, payload: { id: number, email: string, expAt: number } } | null>('auth-token');
  const { onLogout } = useApollo()
  const currentTime = ref(Math.floor(Date.now() / 1000));
  onMounted(() => {
    const interval = setInterval(() => {
      currentTime.value = Math.floor(Date.now() / 1000);
    }, 1000);
    onUnmounted(() => {
      clearInterval(interval);
    });
  });

  const payload = computed(() => {
    return authCookie.value?.payload ?? null
  })
  const user_id = computed(() => {
    return payload.value?.id
  })
  const user_email = computed(() => {
    return payload.value?.email
  })
  const isAuthenticated = computed(() => {
    return payload.value?.expAt! > currentTime.value
  });

  const login = (newToken: string, id: number, email: string, expAt: number) => {
    authCookie.value = { token: newToken, payload: { id, email, expAt } };
  };

  const logout = () => {
    authCookie.value = null;
    onLogout()
  };

  watch(isAuthenticated, (newValue) => {
    console.log(isAuthenticated)
    if (!newValue) {
      logout()
      navigateTo('/login')
    }
  });

  return {
    login,
    logout,
    payload,
    isAuthenticated,
    user_id,
    user_email,
  };
});
