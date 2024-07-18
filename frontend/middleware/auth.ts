import { defineNuxtRouteMiddleware } from "#app";


export default defineNuxtRouteMiddleware ((to,from) => {
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);
    if(!isAuthenticated.value) {
        return navigateTo('/login')
    }
});
