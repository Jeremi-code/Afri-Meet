<template>
  <div class="bg-[#F5F5F9] w-screen h-screen">
    <div class="flex mt-8 justify-center text-black">
      <div class=" w-[350px] px-4 rounded-md border border-black border-opacity-15 py-4 shadow-sm bg-white">
        <h1 class="text-2xl font-bold mb-4 text-center text-black">Sign Up</h1>
        <form @submit.prevent="submitForm">
          <div class="mb-1">
            <label for="firstName" class="block text-gray-700 font-bold text-sm">First Name:</label>
            <input type="text" id="firstName" @input="closeError" v-model="RegisterationForm.firstName" required
              class="bg-white mt-[2px] block w-full rounded-md border border-gray-300 py-[5px] px-2 shadow-sm text-sm" />
          </div>
          <div class="mb-1">
            <label for="lastName" class="block text-gray-700 font-bold text-sm">Last Name:</label>
            <input type="text" id="lastName" @input="closeError" v-model="RegisterationForm.lastName" required
              class="bg-white mt-[2px] block w-full rounded-md border border-gray-300 py-[5px] px-2 shadow-sm text-sm" />
          </div>
          <div class="mb-1">
            <label for="email" class="block text-gray-700 font-bold text-sm">Email:</label>
            <input type="text" id="email" @input="closeError" v-model="RegisterationForm.email" required
              class="bg-white mt-[2px] block w-full rounded-md border border-gray-300 py-[5px] px-2 shadow-sm text-sm" />
            <div v-if="formShowError && errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
          </div>
          <div class="mb-1">
            <label for="password" class="block text-gray-700 font-bold text-sm">Password:</label>
            <div class="relative">
              <input :type="passwordVisible ? 'text' : 'password'" id="password" @input="closeError"
                v-model="RegisterationForm.password" required
                class="bg-white mt-[2px] block w-full rounded-md border border-gray-300 py-[5px] px-2 shadow-sm text-sm" />
              <div @click="togglePasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700">
                <UIcon name="fluent:eye-16-regular" v-if="!passwordVisible" />
                <UIcon name="fluent:eye-off-24-regular" v-if="passwordVisible" />
              </div>
            </div>
            <div v-if="formShowError && errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</div>
          </div>
          <div class="mb-5">
            <label for="confirmPassword" class="block text-gray-700 font-bold text-sm">Confirm Password:</label>
            <div class="relative">
              <input :type="confirmPasswordVisible ? 'text' : 'password'" id="confirmPassword" @input="closeError"
                v-model="RegisterationForm.confirmPassword" required
                class="bg-white mt-[2px] block w-full rounded-md border border-gray-300 py-[5px] px-2 shadow-sm text-sm" />
              <div @click="toggleConfirmPasswordVisibility"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700">
                <UIcon name="fluent:eye-16-regular" v-if="!confirmPasswordVisible" />
                <UIcon name="fluent:eye-off-24-regular" v-if="confirmPasswordVisible" />
              </div>
            </div>
            <div v-if="formShowError && errors.confirmPassword" class="text-red-500 text-sm mt-1">{{
              errors.confirmPassword }}</div>
          </div>
          <button type="submit" :disabled="loading"
            class="w-full bg-[#84CC16] text-white py-[5px] px-3 rounded-md transition-colors flex justify-center items-center hover:opacity-75 mb-5 text-sm">
            <template v-if="loading">
              <div class="spinner mr-2"></div> Loading...
            </template>
            <template v-else>
              Sign Up
            </template>
          </button>
          <NuxtLink to="/login"
            class="mb-4 text-blue-500 underline text-center text-sm flex justify-center items-center">Already
            have an
            account?</NuxtLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import z from "zod";
import { useMutation } from '@vue/apollo-composable';
import { SignupDocument } from "~/gqlGen/types";

interface Form {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const signupForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
});

const RegisterationForm: Ref<Form> = ref({
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
});
const formShowError = ref<boolean>(false)
const errors = ref<{ [key: string]: string }>({})
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false)

const storeAuth = useAuthStore()
const customToaster = useCustomToast()

const { mutate, loading } = useMutation(SignupDocument);

const closeError = () => {
  formShowError.value = false
}
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
const toggleConfirmPasswordVisibility = () => {
  confirmPasswordVisible.value = !confirmPasswordVisible.value
}
const clearForm = () => {
  RegisterationForm.value.email = ''
  RegisterationForm.value.password = ''
  RegisterationForm.value.firstName = ''
  RegisterationForm.value.lastName = ''
  RegisterationForm.value.confirmPassword = ''
}

const submitForm = async () => {
  try {
    const result = signupForm.safeParse(RegisterationForm.value);
    if (!result.success) {
      formShowError.value = true
      errors.value = {}
      result.error.errors.forEach((err) => {
        errors.value[err.path[0]] = err.message
      })
    }
    if (RegisterationForm.value.password !== RegisterationForm.value.confirmPassword) {
      errors.value.confirmPassword = 'Password does not match'
      formShowError.value = true
      return
    };
    if (result.success) {
      const response = await mutate({
        input: {
          first_name: RegisterationForm.value.firstName,
          last_name: RegisterationForm.value.lastName,
          email: RegisterationForm.value.email,
          password: RegisterationForm.value.password,
        }
      })
      if (response?.data?.signup?.token) {
        const newToken = response?.data?.signup?.token
        const user_id = response?.data?.signup?.user_id
        const user_email = RegisterationForm.value.email
        storeAuth.login(newToken, user_id as number, user_email)
      }
      else if (response?.errors && response.errors.length > 0) {
        const emailErr = response.errors[0]?.message
        throw new Error(emailErr)
      }
      clearForm()
      navigateTo('/meetings')
      customToaster.add('Account created successfully', 'ok')
    }

  } catch (error: any) {
    errors.value.email = error.message
    formShowError.value = true
  }
}
</script>

<style scoped>
.spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-left-color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>