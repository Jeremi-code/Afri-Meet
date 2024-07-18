import { defineNuxtRouteMiddleware } from "#app";


export default defineNuxtRouteMiddleware ((to,from) => {
    const store = useAuthStore()
    console.log(store.isAuthenticated)
    if(!store.isAuthenticated) {
        navigateTo('/login')
    }
});
