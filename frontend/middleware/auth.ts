import { defineNuxtRouteMiddleware } from "#app";
import { useRouter } from "vue-router";


export default defineNuxtRouteMiddleware ((to,from) => {
    const store = useAuthStore()
    const router = useRouter()
    console.log(store.isAuthenticated)
    if(!store.isAuthenticated) {
        router.push('/login')
    }
});
