<script setup lang="ts">
import InputComp from '@/components/InputComp.vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import type { LoginInterface } from '@/@types/auth'
import { useLoginMutation, useSignUpMutation } from '@/api/auth/auth-queries'
import { useMakeNewUserMutation } from '@/api/user/user-queries'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

const router = useRouter()

const schema = Yup.object({
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required'),
})

const LoginMutation = useLoginMutation()

async function loginNewUser(values: LoginInterface) {
  try {
    await LoginMutation.mutateAsync(values)
    toast.success('login successfully')
    router.push('/user')
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    toast.error(message)
  }
}

const onSubmit = async (values: any) => {
  await loginNewUser(values)
}
</script>

<template>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    class="max-w-md mx-auto p-6 bg-white rounded shadow"
  >
    <h2 class="text-2xl font-semibold mb-4 text-center">Login Form</h2>

    <InputComp
      name="email"
      type="email"
      label="Email"
      placeholder="Enter your email"
      icon="UserIcon"
    />

    <InputComp
      name="password"
      type="password"
      label="Password"
      placeholder="Enter your password"
      icon="fa-solid fa-lock"
      di
    />

    <button
      type="submit"
      class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
    >
      login
    </button>
    <RouterLink to="/auth/signup">sign up</RouterLink>
  </Form>
</template>
<style scoped></style>
