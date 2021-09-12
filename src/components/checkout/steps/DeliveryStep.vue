<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { NForm, NFormItem, NInput, NAutoComplete } from 'naive-ui'

import {
  useAddressCompletion,
  useAddressValidation
} from '@/components/autoaddress/Autoaddress'

export default defineComponent({
  name: 'DeliveryStep',

  components: {
    NForm,
    NFormItem,
    NInput,
    NAutoComplete
  },

  emits: {
    valid: (isValid: boolean) => typeof isValid === 'boolean'
  },

  setup() {
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

    return {
      addressRef,
      addressCompletions,
      addressStatus,
      addressFeedback
    }
  }
})
</script>
<template>
  <n-form ref="contactRef" inline>
    <n-form-item path="firstname" label="First name">
      <n-input @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="lastname" label="Last name">
      <n-input @keydown.enter.prevent />
    </n-form-item>
  </n-form>
  <n-form ref="deliveryRef">
    <n-form-item
      path="address"
      label="Delivery address"
      :validation-status="addressStatus"
      :feedback="addressFeedback"
    >
      <n-auto-complete
        :options="addressCompletions"
        v-model:value="addressRef"
        placeholder="124 La Trobe Street, Melbourne VIC 3000"
      />
    </n-form-item>
  </n-form>
</template>
