<template>
    <div class="bg-[#F5F5F9] w-screen text-black">
        <div class=" flex items-center justify-center h-screen -mt-8">
            <div class="max-w-md w-[350px] px-6 rounded-md border  border-black border-opacity-15 py-8 shadow-sm bg-white">
                <h1 class="text-3xl text-black font-bold mb-6 text-center">Sign In</h1>
                <form @submit.prevent="submitForm">

                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 font-bold">Email:</label>
                        <input type="text" id="email" v-model="form.email" required
                            class="mt-1 block w-full rounded-md border border-gray-300 py-[5px] px-3 bg-white shadow-sm " />
                    </div>
                    <div class="mb-7">
                        <label for="password" class="block text-gray-700 font-bold">Password:</label>
                        <input type="password" id="password" v-model="form.password" required
                            class="mt-1 block bg-white w-full rounded-md border border-gray-300 py-[5px] px-3 shadow-sm " />
                    </div>

                    <button type="submit"
                        class="w-full bg-[#84CC16] text-white py-[5px] px-4 rounded-md transition-colors hover:opacity-75 mb-5"
                        @submit="submitForm">
                        Sign Up
                    </button>
                    <ULink to='/register' class="mb-5 text-blue-500 underline flex items-center justify-center">Create new account</ULink>
                </form>
        </div>
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

const form: Ref<form> = ref({
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