<template>
  <nav class="sticky top-0 w-screen px-10 bg-white h-16 z-50 border-b border-gray-200">
    <div class="flex justify-between items-center h-full">
      <ULink class="text-lg font-bold text-gray-600 hover:text-gray transition-colors duration-300" to="/">
        Afrimeet
      </ULink>
      <ul class="hidden md:flex space-x-4 items-center list-none">
        <li class="flex items-center">
          <BaseNavLink label="Meetings" to="/meetings" />
        </li>
        <li class="flex items-center">
          <BaseNavLink label="Rooms" to="/rooms" />
        </li>
        <li class="flex items-center">
          <BaseNavLink label="About us" to="/about" />
        </li>

        <div v-if="!isAuthenticated" class="flex flex-row px-2 items-center">
          <li>
            <UButton class="border-50" to="/register">
              Register
            </UButton>
          </li>
          <li class="pl-3 text-lg">
            <UButton class="text-sm hover:text-gray-900 transition-colors duration-300" to="/login" variant="link">
              Login
            </UButton>
          </li>
        </div>
        <div v-else class="flex flex-row px-2 ">
          <li>
            <UButton class="text-sm hover:text-gray-900 transition-colors duration-300" to="/login" variant="link"
              @click="handleLogout">
              Logout
            </UButton>
          </li>
        </div>
      </ul>
      <button @click="toggleMobileMenu" class="md:hidden focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
    <transition name="slide-right">
      <div v-if="isMobileMenuOpen"
        class="fixed top-0 right-0 mlsm:w-screen w-1/3 msm:w-1/2 lsm:w-2/3 h-screen bg-white flex flex-col z-40 transition-transform duration-300 ease-in-out">

        <button @click="toggleMobileMenu" class="self-end focus:outline-none p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul class="mt-[160px] space-y-4 flex-grow flex flex-col items-center text-2xl">
          <li @click="toggleMobileMenu">
            <BaseNavLink label="Meetings" to="/meetings" />
          </li>
          <li @click="toggleMobileMenu">
            <BaseNavLink label="Rooms" to="/rooms" />
          </li>
          <li @click="toggleMobileMenu">
            <BaseNavLink label="About us" to="/about" />
          </li>
          <div v-if="!isAuthenticated" class="flex flex-row space-x-4">
            <li class="mt-8">
              <UButton class="border-50" to="/register">
                Register
              </UButton>
            </li>
            <li class="text-lg mt-8">
              <UButton class="text-sm hover:text-gray-900 transition-colors duration-300" :padded="false" to="/login"
                variant="link">
                Login
              </UButton>
            </li>
          </div>
          <div v-else class="flex flex-col space-y-4">
            <li class="mt-8">
              <UButton class="text-sm hover:text-gray-900 transition-colors duration-300" :padded="false" to="/login"
                variant="link" @click="handleLogout">
                Logout
              </UButton>
            </li>
          </div>
        </ul>
        <div class="border-t border-gray-200 mt-auto w-full">
          <li class="flex items-center justify-center py-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577 0-.285-.011-1.041-.016-2.045-3.338.726-4.042-1.611-4.042-1.611C4.42 17.589 3.633 17.3 3.633 17.3c-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.238 1.839 1.238 1.07 1.832 2.809 1.303 3.495.997.108-.775.418-1.303.762-1.602-2.665-.305-5.467-1.333-5.467-5.933 0-1.31.469-2.381 1.236-3.221-.124-.304-.535-1.532.117-3.191 0 0 1.008-.322 3.302 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.294-1.552 3.302-1.23 3.302-1.23.652 1.659.241 2.887.118 3.191.77.84 1.236 1.911 1.236 3.221 0 4.61-2.807 5.624-5.479 5.921.43.371.815 1.102.815 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.192.694.8.577C20.565 21.796 24 17.301 24 12c0-6.628-5.372-12-12-12z" />
            </svg>
            <span class="ml-2">3 stars</span>
          </li>
        </div>
      </div>
    </transition>
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30"
      @click="toggleMobileMenu"></div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const activeLink = ref<string>('/')
const isMobileMenuOpen = ref<boolean>(false)

const handleLogout = () => {
  authStore.logout()
}

const setActiveLink = (route: string) => {
  activeLink.value = route
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
