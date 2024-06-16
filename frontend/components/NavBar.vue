<template>
    <nav class="sticky top-0 w-screen  bg-white h-16 z-50 border border-">
        <UContainer class="container mx-auto px-4 py-2 flex justify-between items-center h-full">
            <ULink class="text-lg font-bold text-gray-600 hover:text-gray transition-colors duration-300" to="/">
                Afrimeet
            </ULink>
            <ul class="hidden md:flex space-x-4">
                <li class="flex items-center">
                    <BaseNavLink label="Meetings" to="/meetings" />
                </li>
                <li class="flex items-center">
                    <BaseNavLink label="Rooms" to="/rooms" />
                </li>
                <li class="flex items-center">
                    <BaseNavLink label="About us" to="/about" />
                </li>
                <li class="flex items-center">
                    <BaseNavLink label="FAQ" to="/faq" />
                </li>
                <div v-if="!authenticated" class="flex flex-row px-2">
                    <li>
                        <UButton  class="border-50 " to="/register">
                            Register
                        </UButton>
                    </li>
                    <li class="pl-3 text-lg">
                        <UButton  class=" text-sm hover:text-gray-900 transition-colors duration-300"
                            to="/login" variant="link">
                            Login
                        </UButton>
                    </li>

                </div>
                <div  v-if="authenticated" class="flex flex-row px-2">
                    <li>
                        <UButton  class=" text-sm hover:text-gray-900 transition-colors duration-300"
                            to="/login" variant="link" @click="handleLogout">
                            Logout
                        </UButton>

                    </li>
                </div>
            </ul>
        </UContainer>
    </nav>
</template>

<script setup lang="ts">
import authStore from '~/store/authStore';

const storeAuth = authStore()
const authenticated = computed(() => storeAuth.isAuthenticated)
const activeLink = ref<string>('/')

const handleLogout = () => {
    storeAuth.logout()
}
const setActiveLink = (route: string) => {
    activeLink.value = route
}

</script>
