import { defineNuxtRouteMiddleware } from "#app";
import authStore from "~/store/authStore";
import { useRouter } from "vue-router";


export default defineNuxtRouteMiddleware ((to,from) => {
    const store = authStore()
    const router = useRouter()
    console.log(store.isAuthenticated)
    if(!store.isAuthenticated) {
        router.push('/login')
    }
});
