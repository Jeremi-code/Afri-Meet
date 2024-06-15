import { defineStore } from "pinia";

const authStore = defineStore('auth',()=>{
    const cookieToken = useCookie('auth-token')
    console.log(cookieToken.value,cookieToken)
    const isAuthenticated = computed(()=> cookieToken.value ? true : false )
    const login = (newToken : string) => {
        cookieToken.value = newToken
    }
    const logout = () => {
        cookieToken.value = null
    }
return {
    login,
    logout,
    isAuthenticated
}

})

export default authStore