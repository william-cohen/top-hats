<script lang="ts">
import { defineComponent, ref } from 'vue'

import {
  NForm,
  NGrid,
  NFormItemGi,
  NSpace,
  NInput,
  NInputNumber,
  FormItemRule
} from 'naive-ui'

const luhnCheck = (val: string) => {
  let checksum = 0 // running checksum total
  let j = 1 // takes value of 1 or 2

  // Process each digit one by one starting from the last
  for (let i = val.length - 1; i >= 0; i--) {
    let calc = 0
    // Extract the next digit and multiply by 1 or 2 on alternative digits.
    calc = Number(val.charAt(i)) * j

    // If the result is in two digits add 1 to the checksum total
    if (calc > 9) {
      checksum = checksum + 1
      calc = calc - 10
    }

    // Add the units element to the checksum total
    checksum = checksum + calc

    // Switch the value of j
    if (j == 1) {
      j = 2
    } else {
      j = 1
    }
  }

  //Check if it is divisible by 10 or not.
  return checksum % 10 == 0
}

export default defineComponent({
  name: 'PaymentStep',

  props: {
    valid: {
      required: true,
      type: Boolean
    }
  },

  emits: {
    'update:valid': (isValid: boolean) => typeof isValid === 'boolean'
  },

  components: { NForm, NSpace, NGrid, NFormItemGi, NInput, NInputNumber },

  setup(_, context) {
    const paymentModel = ref({
      cardNumber: '',
      expMonth: 1,
      expYear: 2000,
      cvv: ''
    })

    const paymentRules: Record<string, FormItemRule[]> = {
      cardNumber: [
        {
          required: true,
          message: 'A credit-card is required.',
          trigger: ['input', 'blur']
        },
        {
          message: 'This credit card no. is incomplete',
          trigger: ['blur'],
          validator(rule: unknown, value: unknown) {
            if (!value) {
              return new Error('A credit-card is required.')
            }

            if (typeof value !== 'string') {
              return new Error('A credit-card is required.')
            }

            value.replaceAll(' ', '')

            if (value.length < 16) {
              return new Error('A credit-card is required.')
            }

            return true
          }
        },
        {
          message: 'Oops... this card no. does not look right',
          trigger: ['blur'],
          validator(rule: unknown, value: unknown) {
            if (typeof value !== 'string') {
              return new Error('A credit-card is required.')
            }

            value.replaceAll(' ', '')

            if (isNaN(Number(value))) {
              return new Error('Oops... this card no. does not look right')
            }

            if (!luhnCheck(value)) {
              return new Error('Oops... this card no. does not look right')
            }

            return true
          }
        }
      ],
      expMonth: [
        {
          required: true,
          message: 'Please enter a month',
          trigger: ['input', 'blur']
        }
      ],
      expYear: [
        {
          required: true,
          message: 'A valid year is required',
          trigger: ['input', 'blur']
        }
      ],
      cvv: [
        {
          required: true,
          message: 'A valid CVV is required',
          trigger: ['input', 'blur']
        }
      ]
    }

    return {
      paymentModel,
      paymentRules
    }
  }
})
</script>
<template>
  <n-form :model="paymentModel" ref="paymentRef" :rules="paymentRules">
    <n-space justify="center">
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" path="cardNumber" label="Card no.">
          <n-input
            v-model:value="paymentModel.cardNumber"
            @keydown.enter.prevent
          />
        </n-form-item-gi>
        <n-form-item-gi :span="4" path="expMonth" label="Exp. month">
          <n-input-number
            :show-button="false"
            v-model:value="paymentModel.expMonth"
            @keydown.enter.prevent
          />
        </n-form-item-gi>
        <n-form-item-gi :span="4" path="expYear" label="Exp. year">
          <n-input-number
            :show-button="false"
            v-model:value="paymentModel.expYear"
            @keydown.enter.prevent
          />
        </n-form-item-gi>
        <n-form-item-gi :span="5" path="cvv" label="CVV">
          <n-input-number
            :show-button="false"
            v-model:value="paymentModel.cvv"
            @keydown.enter.prevent
          />
        </n-form-item-gi>
      </n-grid>
    </n-space>
  </n-form>
</template>
