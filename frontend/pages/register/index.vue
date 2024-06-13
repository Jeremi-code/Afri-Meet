<template>
  <div class="bg-[#F5F5F9] w-screen h-screen">
    <div class="flex mt-8 justify-center text-black">
      <div class=" w-[350px] px-4 rounded-md border border-black border-opacity-15 py-4 shadow-sm bg-white">
        <h1 class="text-2xl font-bold mb-4 text-center text-black">Sign Up</h1>
        <form @submit.prevent="submitForm">
          <div class="mb-1">
            <label for="firstName" class="block text-gray-700 font-bold text-sm">First Name:</label>
            <input type="text" id="firstName" @input="closeError" v-model="form.firstName" required
              class="bg-white mt-[2px] block w-full rounded-md border border-gray-300 py-[5px] px-2 shadow-sm text-sm" />
          </div>
          <div class="mb-1">
            <label for="lastName" class="block text-gray-700 font-bold text-sm">Last Name:</label>
            <input type="text" id="lastName" @input="closeError" v-model="form.lastName" required
              class="bg-white mt-[2px] block w-full rounded-md border border-gray-300 py-[5px] px-2 shadow-sm text-sm" />
          </div>
          <div class="mb-1">
            <label for="email" class="block text-gray-700 font-bold text-sm">Email:</label>
            <input type="text" id="email" @input="closeError" v-model="form.email" required
              class="bg-white mt-[2px] block w-full rounded-md border border-gray-300 py-[5px] px-2 shadow-sm text-sm" />
            <div v-if="formShowError && errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
          </div>
          <div class="mb-1">
            <label for="password" class="block text-gray-700 font-bold text-sm">Password:</label>
            <div class="relative">
              <input :type="passwordVisible ? 'text' : 'password'" id="password" @input="closeError"
                v-model="form.password" required
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
                v-model="form.confirmPassword" required
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
          <button type="submit"
            class="w-full bg-[#84CC16] text-white py-[5px] px-3 rounded-md transition-colors hover:opacity-75 mb-5 text-sm">
            Sign Up
          </button>
          <NuxtLink to="/login"
            class="mb-4 text-blue-500 underline text-center text-sm flex justify-center items-center">Already have an
            account?</NuxtLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import z from "zod";
import { useMutation,useQuery } from '@vue/apollo-composable';
import { CheckUserByEmailDocument, SignupDocument } from "~/gqlGen/types";

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

const form: Ref<Form> = ref({
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
});

const { mutate, loading, error } = useMutation(SignupDocument);
const {query} = useQuery(CheckUserByEmailDocument)

const formShowError = ref<boolean>(false)
const errors = ref<{ [key: string]: string }>({})
const closeError = () => {
  formShowError.value = false
}
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false)
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const toggleConfirmPasswordVisibility = () => {
  confirmPasswordVisible.value = !confirmPasswordVisible.value
}

const submitForm = async () => {
  try {
    const result = signupForm.safeParse(form.value);
    
    if (!result.success) {
      console.log(result.error)
      formShowError.value = true
      errors.value = {}
      result.error.errors.forEach((err) => {
        errors.value[err.path[0]] = err.message
      })
    }
    if (form.value.password !== form.value.confirmPassword) {
      errors.value.confirmPassword = 'Password does not match'
      formShowError.value = true
      return
    };
    if (result.success) {
      const response = await mutate({
        input: {
          first_name: form.value.firstName,
          last_name: form.value.lastName,
          email: form.value.email,
          password: form.value.password,
        }
      })
      if (response?.errors && response.errors.length>0){
        const emailErr = response.errors[0]?.message
        throw new Error(emailErr)
      }
    }
    
  } catch(error : any) {
    errors.value.email = error.message
    formShowError.value = true
    console.log(error)
  }
  }
</script>