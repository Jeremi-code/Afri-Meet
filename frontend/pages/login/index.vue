<template>
    <div class="bg-[#F5F5F9] w-screen text-black">
        <div class="flex items-center justify-center h-screen -mt-8">
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
                        class="w-full bg-[#84CC16] text-white py-[5px] px-4 rounded-md transition-colors hover:opacity-75 mb-5">
                        <template v-if="loading">
                            <div class="spinner mr-2"></div> Loading...
                        </template>
                        <template v-else>
                            Sign In
                        </template>
                    </button>
                    <ULink to="/register" class="mb-5 text-blue-500 underline flex items-center justify-center">
                        Create new account
                    </ULink>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import z from 'zod';
import { useQuery } from '@vue/apollo-composable';
import { LoginDocument } from '~/gqlGen/types';
const signinForm = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

interface Form {
    email: string;
    password: string;
}

const form = ref<Form>({
    email: '',
    password: ''
});
const errors = ref<{ [key: string]: string }>({});
const formErrorVisible = ref(false)
const closeError = () => {
    formErrorVisible.value = false
}
const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};
const { loading, error, mutate } = useMutation(LoginDocument)
const router = useRouter()
const authToken = useCookie('auth-token')

const submitForm = async () => {
    try {
        const result = signinForm.safeParse(form.value)
        if (!result.success) {
            errors.value = {}
            result.error.errors.forEach((err) => {
                errors.value[err.path[0]] = err.message;
                formErrorVisible.value = true
            });
            return;
        }
        const response = await mutate({
            input: {
                email: result.data.email,
                password: result.data.password
            }
        })
        if (response?.data?.login?.token) {
            if (authToken.value) {
                console.log(authToken.value)
                authToken.value = null
                console.log(authToken.value)
            }
            authToken.value = response?.data?.login?.token
            form.value.email = ''
            form.value.password = ''
            router.push('/meetings')
        }
        else if (response?.errors && response.errors.length > 0) {
            const emailErr = response.errors[0]?.message
            throw new Error(emailErr)
        }
        console.log('Form submitted:', response);
    } catch (error: any) {
        errors.value.email = error.message
        formErrorVisible.value = true
    }

//     const result = signinForm.safeParse(form.value)
//     if (!result.success) {
//         errors.value = {}
//         result.error.errors.forEach((err) => {
//             errors.value[err.path[0]] = err.message;
//             formErrorVisible.value = true
//         });
//         return;
//     }
//     const response = await mutate({
//         input: {
//             email: result.data.email,
//             password: result.data.password
//         }
//     })
//     if (response?.data?.login?.token) {
//         authToken.value = response?.data?.signup?.token
//     }
//     else if (response?.errors && response.errors.length > 0) {
//         const emailErr = response.errors[0]?.message
//         throw new Error(emailErr)
//     }
//     console.log('Form submitted:', response);

// watchEffect(() => {
// if (result.value) {
//     console.log(result.value)
//     const token = result.value.findUser?.token;
//     if (token) {
//         const authToken = useCookie('auth-token');
//         if (authToken.value) {
//             authToken.value = null
//         }
//         authToken.value = token;
//         router.push('/meetings')
//     }
// }

// if (error.value) {
//     console.error(error.value);
//     formErrorVisible.value = true;
//     errors.value.general = 'An error occurred. Please try again.';
// }
// });
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