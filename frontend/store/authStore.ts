import { defineStore } from 'pinia';
import { computed } from 'vue';


export const useAuthStore = defineStore('authStore', () => {
  const authCookie = useCookie<{ token: string, payload: { id: number, email: string } } | null>('auth-token');
  const { onLogout } = useApollo()

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
    return payload.value !== null
  });

  const login = (newToken: string, id: number, email: string) => {
    authCookie.value = { token: newToken, payload: { id, email } };
  };

  const logout = () => {
    authCookie.value = null;
    onLogout()
  };

  return {
    login,
    logout,
    payload,
    isAuthenticated,
    user_id,
    user_email,
  };
});
