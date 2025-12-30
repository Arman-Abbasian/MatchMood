<script setup lang="ts">
import InputComp from '@/components/common/InputComp.vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import { EnvelopeIcon, EyeSlashIcon, UserIcon } from '@heroicons/vue/24/outline'
import type { SignupInterface } from '@/@types/auth'
import { useSignUpMutation } from '@/api/auth/auth-queries'
import { useMakeNewUserMutation } from '@/api/user/user-queries'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import ActionButton from '@/components/common/ActionButton.vue'

const router = useRouter()

const schema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'At least 3 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'At least 6 characters'),
})

const { mutateAsync: SingUp, isPending: SignUpLoading } = useSignUpMutation()
const { mutateAsync: makeNewUser, isPending: makeNewUserLoading } =
  useMakeNewUserMutation()

async function signupNewUser(values: SignupInterface) {
  try {
    const { user } = await SingUp(values)
    if (user) {
      await makeNewUser({
        userId: user.id,
        name: values.name,
      })
      toast.success('signup successfully')
      router.push(`/user`)
    } else {
      toast.error('Registration Error')
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    toast.error(message)
  }
}

const onSubmit = async (values: any) => {
  await signupNewUser(values)
}
</script>

<template>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    class="max-w-md mx-auto p-6 bg-white rounded shadow-2xl backdrop-blur-2xl mt-8"
  >
    <h2 class="text-2xl font-semibold mb-4 text-center text-primary-500">
      Signup Form
    </h2>

    <InputComp
      name="name"
      label="Name"
      placeholder="Enter your name"
      icon="fa-solid fa-user"
    >
      <template #icon> <UserIcon class="w-5 h-5 text-primary-500" /> </template
    ></InputComp>

    <InputComp
      name="email"
      type="email"
      label="Email"
      placeholder="Enter your email"
    >
      <template #icon>
        <EnvelopeIcon class="w-5 h-5 text-primary-500" /></template
    ></InputComp>

    <InputComp
      name="password"
      type="password"
      label="Password"
      placeholder="Enter your password"
    >
      <template #icon>
        <EyeSlashIcon class="w-5 h-5 text-primary-500" /></template
    ></InputComp>

    <ActionButton
      text="Sign Up"
      :loading="SignUpLoading || makeNewUserLoading"
    />
    <div class="w-full flex justify-end mt-4">
      <RouterLink to="/auth/login" class="underline text-info"
        >login</RouterLink
      >
    </div>
  </Form>
</template>
<style scoped></style>
