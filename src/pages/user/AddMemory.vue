<script setup lang="ts">
import InputComp from '@/components/InputComp.vue'
import { Field, useForm } from 'vee-validate'
import * as Yup from 'yup'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue'
import SelectComp from '@/components/SelectComp.vue'
import { useGetAllSports } from '@/api/global/global-queries'
import { useMakeNewMemoryMutation } from '@/api/reminder/memory-queries'

//---types
type FormValuesType = {
  mood: '0' | '1'
  visibility: '0' | '1'
  description: string
  sport_id: number
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
      label="Sport"
      :options="sportsList"
      :return-id="true"
      placeholder="Search and select a sport..."
    />

    <!-- Date Picker -->
    <Field name="date" v-slot="{ value, handleChange, handleBlur, errors }">
      <div class="mb-4">
        <VueDatePicker
          :model-value="value"
          @update:model-value="
            (newValue) => {
              console.log('Date selected:', newValue)
              handleChange(newValue)
            }
          "
          @blur="handleBlur"
          :enable-time-picker="false"
          placeholder="Select date"
          format="yyyy-MM-dd"
          auto-apply
          :clearable="true"
        />

        <span v-if="errors[0]" class="text-red-500 text-sm mt-1 block">
          {{ errors[0] }}{{ value }}
          {{ JSON.stringify(errors) }}
        </span>
      </div>
    </Field>

    <!-- Description Textarea -->
    <InputComp
      name="description"
      placeholder="Describe your memory..."
      as="textarea"
      class="!h-32"
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
    <button
      type="submit"
      class="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
    >
      Submit
    </button>

    <!-- Debug: نمایش مقادیر -->
    <div class="mt-4 p-4 bg-gray-50 rounded-lg text-sm border">
      <p class="font-semibold mb-2">Current Values:</p>
      <pre class="text-xs">{{ JSON.stringify(values, null, 2) }}</pre>
    </div>
  </form>
</template>
