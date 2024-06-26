import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
const authStore = defineStore("auth", () => {
  const cookieToken = useCookie("auth-token");
  const user_id = ref<number>(-1);
  const isAuthenticated = computed(() => {
    if (!cookieToken.value) return false;
    const decodedToken = jwtDecode(cookieToken.value as string);
    const currentTime: number = Math.floor(Date.now() / 1000);
    const expiredAt = decodedToken.exp;
    if (expiredAt != undefined) {
      if (expiredAt < currentTime) {
        cookieToken.value = null;
        return false
      }
    }
    return true
  });

  const login = (newToken: string,id:number) => {
    if(cookieToken.value) {
      cookieToken.value = null
    }
    user_id.value = id
    cookieToken.value = newToken;
  };
  const logout = () => {
    cookieToken.value = null;
    user_id.value = -1

  };
  return {
    login,
    logout,
    isAuthenticated,
    user_id
  };
});

export default authStore;
