<template>
  <div class=" flex items-center justify-center h-screen">
    <div class="max-w-md w-full px-6 rounded-md border  border-black border-opacity-15 py-10 shadow-sm">
      <h1 class="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="firstName" class="block text-gray-700 font-bold"
            >First Name:</label
          >
          <input
            type="text"
            id="firstName"
            v-model="form.firstName"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm "
          />
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-gray-700 font-bold"
            >Last Name:</label
          >
          <input
            type="text"
            id="lastName"
            v-model="form.lastName"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm "
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold"
            >Email:</label
          >
          <input
            type="text"
            id="email"
            v-model="form.email"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm "
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold"
            >Password:</label
          >
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm "
          />
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block text-gray-700 font-bold"
            >Confirm Password:</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm "
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#3e3e3e] text-white py-2 px-4 rounded-md transition-colors hover:opacity-75 mb-4" @submit="submitForm"
        >
          Sign Up
        </button>
        <NuxtLink to="/login" class="text-blue-500 underline text-center">Already have an account?</NuxtLink>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import z from "zod";
interface form {
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

const form:Ref<form> = ref({
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
});

const submitForm = () => {
  const result = signupForm.safeParse(form.value);
  if (!result.success) {
    alert("Invalid form data");
    return;
  }
  if (form.value.password !== form.value.confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  console.log("Form submitted:", form.value);
};
</script>
