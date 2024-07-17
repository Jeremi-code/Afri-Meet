import { defineNuxtRouteMiddleware } from "#app";
import { useRouter } from "vue-router";


export default defineNuxtRouteMiddleware ((to,from) => {
    const store = useAuthStore()
    console.log(store.isAuthenticated)
    if(!store.isAuthenticated) {
        navigateTo('/login')
    }
});
