<script setup lang="ts">
import InputComp from '@/components/InputComp.vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import { UsersIcon } from '@heroicons/vue/24/outline'
import { supabase } from '@/supabaseClient'
import type { SignupInterface } from '@/@types/auth'

const schema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'At least 3 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'At least 6 characters'),
})

async function signUp(values: SignupInterface) {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  })

  if (error) throw error

  const userId = data.user?.id

  if (userId) {
    const { error: insertError } = await supabase.from('profiles').insert({
      id: userId,
      name: values.name,
    })

    if (insertError) throw insertError
  }

  return data
}
const onSubmit = async (values: any) => {
  await signUp(values)
}
</script>

<template>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    class="max-w-md mx-auto p-6 bg-white rounded shadow"
  >
    <h2 class="text-2xl font-semibold mb-4 text-center">Signup Form</h2>

    <InputComp
      name="name"
      label="Name"
      placeholder="Enter your name"
      icon="fa-solid fa-user"
    >
      <template #icon> <UsersIcon class="w-5 h-5 text-gray-500" /> </template
    ></InputComp>

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
    />

    <button
      type="submit"
      class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
    >
      Submit
    </button>
  </Form>
</template>
<style scoped></style>
