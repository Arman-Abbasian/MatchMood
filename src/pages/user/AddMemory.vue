<script setup lang="ts">
import InputComp from '@/components/common/InputComp.vue'
import { Field, useForm } from 'vee-validate'
import * as Yup from 'yup'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue'
import SelectComp from '@/components/common/SelectComp.vue'
import { useGetAllSports } from '@/api/global/global-queries'
import { useMakeNewMemoryMutation } from '@/api/reminder/memory-queries'
import { useGetUserQuery } from '@/api/user/user-queries'
import ActionButton from '@/components/common/ActionButton.vue'

//---types
type FormValuesType = {
  mood: '0' | '1'
  visibility: '0' | '1'
  description: string
  sport_id: number
  user_id: string
  date: string
}

//---schema
const schema = Yup.object({
  sport_id: Yup.number().required('Sport is required'),
  date: Yup.date()
    .required('Date is required')
    .nullable()
    .typeError('Please select a valid date'),
  description: Yup.string().required('Description is required'),
  mood: Yup.string().oneOf(['0', '1']).required('mood is required'),
  visibility: Yup.string().oneOf(['0', '1']).required('visibility is required'),
})

//APIs
const { data } = useGetAllSports()
const { data: GetUser } = useGetUserQuery()
const { mutateAsync: MakeNewMemory, isPending: MakeNewMemoryLoading } =
  useMakeNewMemoryMutation()

//Methods
const { handleSubmit, values } = useForm<FormValuesType>({
  validationSchema: schema,
  initialValues: {
    mood: '0',
    visibility: '0',
    description: '',
    sport_id: 0,
    user_id: GetUser.value?.user.id,
    date: '',
  },
})

const onSubmit = handleSubmit(async (formValues) => {
  console.log('✅ Form submitted:', formValues)
  await MakeNewMemory(formValues)
})

//computed
const sportsList = computed(() => {
  if (!data.value) return []
  return [...data.value]
})
</script>

<template>
  <form
    @submit="onSubmit"
    class="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4"
  >
    <!-- Sport Select box -->
    <SelectComp
      name="sport_id"
      :options="sportsList"
      :return-id="true"
      placeholder="choose a sport..."
    />

    <!-- Date Picker -->
    <Field name="date" v-slot="{ value, handleChange, handleBlur, errors }">
      <div class="mb-4">
        <VueDatePicker
          :model-value="value"
          @update:model-value="
            (newValue) => {
              handleChange(newValue)
            }
          "
          @blur="handleBlur"
          placeholder="Select date"
          format="yyyy-MM-dd"
          :clearable="true"
          input-class="w-full border border-primary-100 rounded-lg p-3 text-sm text-text-main focus:ring-0 focus:outline-none"
        />
        <span v-if="errors[0]" class="text-red-500 text-sm mt-2 block">
          {{ errors[0] }}
        </span>
      </div>
    </Field>

    <!-- Description Textarea -->
    <InputComp
      name="description"
      placeholder="Describe your memory..."
      as="textarea"
      class="!h-32 text-text-main border-primary-100 :placeholder:text-sm"
    />

    <!-- mood Radio Buttons -->
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">
        Mood <span class="text-red-500">*</span>
      </label>
      <div class="flex items-center gap-6">
        <InputComp name="mood" label="Happy 😊" type="radio" value="0" />
        <InputComp name="mood" label="Sad 😔" type="radio" value="1" />
      </div>
      <label class="block text-sm font-medium text-gray-700">
        visibility <span class="text-red-500">*</span>
      </label>
      <div class="flex items-center gap-6">
        <InputComp name="visibility" label="public 🔓" type="radio" value="0" />
        <InputComp
          name="visibility"
          label="Private 🔒"
          type="radio"
          value="1"
        />
      </div>
    </div>

    <!-- Submit Button -->
    <ActionButton text="Add" />
  </form>
</template>
