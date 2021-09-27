<script lang="ts">
import { computed, defineComponent, onActivated, ref, watch } from 'vue'
import { NForm, NFormItem, NInput, NAutoComplete } from 'naive-ui'

import {
  useAddressCompletion,
  useAddressValidation
} from '@/components/autoaddress/Autoaddress'

export default defineComponent({
  name: 'DeliveryStep',

  props: {
    valid: {
      required: true,
      type: Boolean
    }
  },

  emits: {
    'update:valid': (isValid: boolean) => typeof isValid === 'boolean'
  },

  components: {
    NForm,
    NFormItem,
    NInput,
    NAutoComplete
  },

  setup(_, context) {
    const addressRef = ref('')
    const { completions } = useAddressCompletion(addressRef)
    const { isValid } = useAddressValidation(addressRef)

    const addressCompletions = computed(() =>
      completions.value.map((completion) => ({
        label: completion.full_address,
        value: completion.full_address
      }))
    )

    const addressStatus = computed<'error' | 'success' | 'warning'>(() =>
      isValid.value ? 'success' : 'warning'
    )

    const addressFeedback = computed(() =>
      isValid.value
        ? 'We will see you there.'
        : 'Please enter a correct address.'
    )

    const contactModel = ref({
      firstName: '',
      lastName: ''
    })

    const contactRules = {
      firstName: [
        {
          required: true,
          message: 'First name is required',
          trigger: ['input', 'blur']
        }
      ],
      lastName: [
        {
          required: true,
          message: 'Last name is also required',
          trigger: ['input', 'blur']
        }
      ]
    }

    const formValid = computed(
      () =>
        contactModel.value.firstName.length > 0 &&
        contactModel.value.lastName.length > 0 &&
        isValid.value
    )

    watch(formValid, (valid) => context.emit('update:valid', valid))

    onActivated(() => context.emit('update:valid', formValid.value))

    return {
      addressRef,
      addressCompletions,
      addressStatus,
      addressFeedback,
      contactModel,
      contactRules
    }
  }
})
</script>
<template>
  <n-form :model="contactModel" ref="contactRef" :rules="contactRules" inline>
    <n-form-item path="firstName" label="First name">
      <n-input v-model:value="contactModel.firstName" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="lastName" label="Last name">
      <n-input v-model:value="contactModel.lastName" @keydown.enter.prevent />
    </n-form-item>
  </n-form>
  <n-form ref="deliveryRef">
    <n-form-item
      path="address"
      label="Delivery address"
      :validation-status="addressStatus"
      :feedback="addressFeedback"
      :required="true"
    >
      <n-auto-complete
        :options="addressCompletions"
        v-model:value="addressRef"
        placeholder="124 La Trobe Street, Melbourne VIC 3000"
      />
    </n-form-item>
  </n-form>
</template>
