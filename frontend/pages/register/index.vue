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
          </div>
          <div class="mb-1">
            <label for="password" class="block text-gray-700 font-bold text-sm">Password:</label>
            <input type="password" id="password" @input="closeError" v-model="form.password" required
              class="bg-white mt-[2px] block w-full rounded-md border border-gray-300 py-[5px] px-2 shadow-sm text-sm" />
          </div>
          <div class="mb-5">
            <label for="confirmPassword" class="block text-gray-700 font-bold text-sm">Confirm Password:</label>
            <input type="password" id="confirmPassword" @input="closeError" v-model="form.confirmPassword" required
              class="bg-white mt-[2px] block w-full rounded-md border border-gray-300 py-[5px] px-2 shadow-sm text-sm" />
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
const formShowError = ref<boolean>(false)
const errors = ref<{[key:string] : string}>({})
const closeError = () => {
  formShowError.value = false
}

const submitForm = () => {
  const result = signupForm.safeParse(form.value);
  if (!result.success) {
    console.log(result.error)
    formShowError.value = true
    errors.value = {}
    result.error.errors.forEach((err) => {
      errors.value[err.path[0]] = err.message
    })
    return;
  }
  if (form.value.password !== form.value.confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  console.log("Form submitted:", form.value);
};
</script>