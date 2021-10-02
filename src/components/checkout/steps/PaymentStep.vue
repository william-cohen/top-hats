<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

import {
  NForm,
  NGrid,
  NFormItemGi,
  NSpace,
  NInput,
  FormItemRule,
  FormValidationError,
  NAlert
} from 'naive-ui'

type NFormElement = {
  validate: (
    validateCallback?: (errors?: Array<FormValidationError>) => void,
    shouldRuleBeApplied?: (arg: FormItemRule) => boolean
  ) => Promise<void>
}

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

  components: { NForm, NSpace, NGrid, NFormItemGi, NInput, NAlert },

  setup(_, context) {
    const paymentModel = ref({
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvv: ''
    })

    const paymentRules: Record<string, FormItemRule[]> = {
      cardNumber: [
        {
          required: true,
          message: 'A credit-card is required.',
          trigger: ['blur']
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
          trigger: ['blur']
        },
        {
          trigger: ['blur'],
          validator(rule: unknown, value: unknown) {
            const month = Number(value)
            if (isNaN(month)) {
              return new Error('Needs to be a valid month')
            }

            if (month < 1 || month > 12) {
              return new Error('Needs to be within 1-12')
            }

            return true
          }
        }
      ],
      expYear: [
        {
          required: true,
          message: 'A valid year is required',
          trigger: ['blur']
        },
        {
          trigger: ['blur'],
          validator(rule: unknown, value: unknown) {
            const year = Number(value)
            if (isNaN(year)) {
              return new Error('Needs to be a valid year')
            }

            if (year < 2021) {
              return new Error('Expired year')
            }

            return true
          }
        },
        {
          trigger: ['blur'],
          validator(rule: unknown, value: unknown) {
            const month = Number(paymentModel.value.expMonth)
            const year = Number(paymentModel.value.expYear)
            const expiry = new Date()
            expiry.setFullYear(year, month, 1)
            const today = new Date()

            if (today > expiry) {
              return new Error('This card is expired.')
            }

            return true
          }
        }
      ],
      cvv: [
        {
          message: 'A valid CVV is required',
          trigger: ['input', 'blur']
        },
        {
          trigger: ['blur'],
          validator(rule: unknown, value: unknown) {
            const cvv = Number(value)

            if (isNaN(cvv)) {
              return new Error('CVV is invalid')
            }

            if (cvv < 100 || cvv > 999) {
              return new Error('CVV is invalid')
            }

            return true
          }
        }
      ]
    }

    const errorText = ref('Aaa')

    const paymentRef = ref<NFormElement | null>(null)

    watchEffect(() => {
      paymentRef.value?.validate((errors) => {
        errorText.value = ''
        if (errors) {
          const first = errors[0]
          const error = first[0]
          errorText.value = error.message || ''
        }
        context.emit('update:valid', !errors || errors?.length === 0)
      })
    })

    return {
      paymentRef,
      paymentModel,
      paymentRules,
      errorText
    }
  }
})
</script>
<template>
  <n-form
    :model="paymentModel"
    ref="paymentRef"
    :rules="paymentRules"
    :show-feedback="false"
  >
    <n-space justify="center">
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" path="cardNumber" label="Card no.">
          <n-input
            v-model:value="paymentModel.cardNumber"
            @keydown.enter.prevent
          />
        </n-form-item-gi>
        <n-form-item-gi :span="4" path="expMonth" label="Exp. month">
          <n-input
            v-model:value="paymentModel.expMonth"
            placeholder="3"
            @keydown.enter.prevent
          />
        </n-form-item-gi>
        <n-form-item-gi :span="4" path="expYear" label="Exp. year">
          <n-input
            v-model:value="paymentModel.expYear"
            placeholder="2024"
            @keydown.enter.prevent
          />
        </n-form-item-gi>
        <n-form-item-gi :span="5" path="cvv" label="CVV">
          <n-input v-model:value="paymentModel.cvv" @keydown.enter.prevent />
        </n-form-item-gi>
      </n-grid>
    </n-space>
    <br />
    <n-alert v-if="errorText" title="Payment info" type="warning">{{
      errorText
    }}</n-alert>
  </n-form>
</template>
