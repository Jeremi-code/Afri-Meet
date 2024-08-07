<template>
    <div class="bg-[#F5F5F9] w-screen text-black">
        <div class="flex items-center mx-4 justify-center min-h-screen -mt-8">
            <div
                class="max-w-md w-[350px] px-6 rounded-md border border-black border-opacity-15 py-8 shadow-sm bg-white">
                <h1 class="text-3xl text-black font-bold mb-6 text-center">Sign In</h1>
                <form @submit.prevent="submitForm">
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 font-bold">Email:</label>
                        <input type="text" id="email" @input="closeError()" v-model="form.email" required
                            class="mt-1 block w-full rounded-md border border-gray-300 py-[5px] px-3 bg-white shadow-sm" />
                        <div v-if="formErrorVisible && errors.email" class="text-red-500 text-sm mt-1">{{
                            errors.email }}</div>
                    </div>
                    <div class="mb-7">
                        <label for="password" class="block text-gray-700 font-bold">Password:</label>
                        <div class="relative">
                            <input :type="passwordVisible ? 'text' : 'password'" id="password" @input="closeError"
                                v-model="form.password" required
                                class="mt-1 block w-full rounded-md border border-gray-300 py-[5px] px-3 shadow-sm bg-white" />
                            <div @click="togglePasswordVisibility"
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700">
                                <UIcon name="fluent:eye-16-regular" v-if="!passwordVisible" />
                                <UIcon name="fluent:eye-off-24-regular" v-if="passwordVisible" />
                            </div>
                        </div>
                        <div v-if="formErrorVisible && errors.password" class="text-red-500 text-sm mt-1">{{
                            errors.password }}</div>
                    </div>
                    <button type="submit" :disabled="loading"
                        class="w-full bg-[#84CC16] text-white py-[5px] px-4 rounded-md transition-colors hover:opacity-75 mb-5 flex justify-center items-center">
                        <template v-if="loading">
                            <div class="spinner mr-2"></div> Loading...
                        </template>
                        <template v-else>
                            Sign In
                        </template>
                    </button>
                    <ULink to="/register" class="mb-4 text-blue-500 underline flex items-center justify-center">
                        Create new account
                    </ULink>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import z from 'zod';
import { LoginDocument } from '~/gqlGen/types';

definePageMeta({
    middleware :'auth'
})

interface Form {
    email: string;
    password: string;
}

const signinForm = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

const form = ref<Form>({
    email: '',
    password: ''
});
const formErrorVisible = ref(false)
const passwordVisible = ref(false);
const errors = ref<{ [key: string]: string }>({});
const globalError = ref(false)

const jwtParser = useJwtParser()
const { onLogin } = useApollo()
const authStore = useAuthStore()
const customToaster = useCustomToast()

const closeError = () => {
    formErrorVisible.value = false
}
const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};
const { loading, mutate } = useMutation(LoginDocument)
const validateForm = () => {
    const result = signinForm.safeParse(form.value)
    if (!result.success) {
        errors.value = {}
        result.error.errors.forEach((err) => {
            errors.value[err.path[0]] = err.message;
            formErrorVisible.value = true
        })
        return
    }
}


const submitForm = async () => {
    try {
        validateForm()
        const response = await mutate({
            input: {
                email: form.value.email,
                password: form.value.password
            }
        })
        if (response?.data?.login?.token) {
            const newToken = response?.data?.login?.token
            const user_id = response?.data?.login?.user_id
            const user_email = form.value.email
            const parseResult = await jwtParser.parse(newToken)
            if (parseResult) {
                customToaster.add('Login successful', 'ok')
                onLogin(newToken)
                authStore.login(newToken, user_id, user_email, parseResult.payload.exp!)
                navigateTo('/meetings')
            }
        }
        else if (response?.errors && response.errors.length > 0) {
            const globalErr = response.errors[0]?.message
            throw new Error(globalErr)
        }
    } catch (error: any) {
        globalError.value = true
        customToaster.add('Invalid email or password', 'error')
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