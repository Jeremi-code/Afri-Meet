<template>
    <nav class="sticky top-0 w-screen px-10 bg-white h-16 z-50 border-b border-gray-200">
      <div class="flex justify-between items-center h-full">
        <ULink class="text-lg font-bold text-gray-600 hover:text-gray transition-colors duration-300" to="/">
          Afrimeet
        </ULink>
        <div class="hidden md:flex space-x-4 items-center">
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
          <div v-if="!isAuthenticated" class="flex flex-row px-2">
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
          <div v-else class="flex flex-row px-2">
            <li>
              <UButton class="text-sm hover:text-gray-900 transition-colors duration-300" to="/login" variant="link" @click="handleLogout">
                Logout
              </UButton>
            </li>
          </div>
        </div>
        <button @click="toggleMobileMenu" class="md:hidden focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <transition name="slide-right">
        <div v-if="isMobileMenuOpen" class="fixed top-0 right-0 w-1/3 h-screen bg-white flex flex-col z-40 items-center transition-transform duration-300 ease-in-out">
          <button @click="toggleMobileMenu" class="self-end focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul class="mt-[160px] space-y-4">
            <li @click="toggleMobileMenu">
              <BaseNavLink label="Meetings" to="/meetings" />
            </li>
            <li @click="toggleMobileMenu">
              <BaseNavLink label="Rooms" to="/rooms" />
            </li>
            <li @click="toggleMobileMenu">
              <BaseNavLink label="About us" to="/about" />
            </li>
            <li @click="toggleMobileMenu">
              <BaseNavLink label="FAQ" to="/faq" />
            </li>
            <div v-if="!isAuthenticated" class="flex flex-col space-y-4">
              <li>
                <UButton class="border-50" to="/register">
                  Register
                </UButton>
              </li>
              <li class="text-lg">
                <UButton class="text-sm hover:text-gray-900 transition-colors duration-300" :padded="false" to="/login" variant="link">
                  Login
                </UButton>
              </li>
            </div>
            <div v-else class="flex flex-col space-y-4">
              <li>
                <UButton class="text-sm hover:text-gray-900 transition-colors duration-300" :padded="false" to="/login" variant="link" @click="handleLogout">
                  Logout
                </UButton>
              </li>
            </div>
          </ul>
        </div>
      </transition>
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30" @click="toggleMobileMenu"></div>
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
  .slide-right-enter-active, .slide-right-leave-active {
    transition: all 0.3s ease;
  }
  .slide-right-enter, .slide-right-leave-to  {
    transform: translateX(100%);
  }
  </style>