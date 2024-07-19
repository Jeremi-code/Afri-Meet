import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { storeToRefs } from 'pinia';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);

    if (isAuthenticated.value) {
        if (to.path === '/login' || to.path === '/register') {
            return navigateTo('/');
        }
    } else {
        if (to.path !== '/login' && to.path !== '/register') {
            return navigateTo('/login');
        }
    }
});
