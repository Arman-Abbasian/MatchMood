<script setup lang="ts">
import InputComp from '@/components/InputComp.vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import { UsersIcon } from '@heroicons/vue/24/outline'

const schema = Yup.object({
  sport: Yup.string().required('sport is required'),
  description: Yup.string().required('description is required'),
  spirit: Yup.string().required('spirit is required'),
})

const onSubmit = async (values: any) => {
  console.log(values)
}
</script>

<template>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    class="max-w-md mx-auto p-6 bg-white rounded shadow"
    :initial-values="{ spirit: '0', description: '', sport: '' }"
  >
    <InputComp
      name="sport"
      label="sport"
      placeholder="choose a sport"
      icon="fa-solid fa-user"
    >
      <template #icon> <UsersIcon class="w-5 h-5 text-gray-500" /> </template
    ></InputComp>

    <InputComp
      name="description"
      label="description"
      placeholder="Describe your reminder..."
      as="textarea"
      class="!h-48"
    />
    <div class="flex items-center gap-4">
      <InputComp
        name="spirit"
        label="happy"
        placeholder="Describe your reminder..."
        type="radio"
        value="0"
      />
      <InputComp
        name="spirit"
        label="sad"
        placeholder="Describe your reminder..."
        type="radio"
        value="1"
      />
    </div>

    <button
      type="submit"
      class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
    >
      Submit
    </button>
    <RouterLink to="/auth/login">login</RouterLink>
  </Form>
</template>
<style scoped></style>
