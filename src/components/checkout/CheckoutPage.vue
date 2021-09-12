<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { NSpace, NSteps, NStep, NCard, NButtonGroup, NButton } from 'naive-ui'

import CartStep from './steps/CartStep.vue'
import DeliveryStep from './steps/DeliveryStep.vue'
import PaymentStep from './steps/PaymentStep.vue'
import ProcessedStep from './steps/ProcessedStep.vue'

export default defineComponent({
  name: 'CheckoutPage',

  props: {},

  components: { NSpace, NSteps, NStep, NCard, NButtonGroup, NButton },

  setup() {
    const current = ref(2)
    const currentStatus = ref<'process' | 'finish' | 'error' | 'wait'>(
      'process'
    )

    const stepComponents = [CartStep, DeliveryStep, PaymentStep, ProcessedStep]

    const stepComponent = computed(() => stepComponents[current.value - 1])

    return {
      current,
      currentStatus,
      stepComponent
    }
  }
})
</script>
<template>
  <n-space vertical>
    <n-card
      :segmented="{
        content: 'hard',
        footer: 'soft'
      }"
    >
      <n-steps :current="current" :status="currentStatus">
        <n-step title="Cart" description="Your shopping cart" />
        <n-step
          title="Delivery address"
          description="Specify delivery address"
        />
        <n-step title="Payment" description="Choose a payment method" />
        <n-step
          title="Order processed"
          description="Order placed successfully!"
        />
      </n-steps>
      <template #footer>
        <component :is="stepComponent" />
      </template>
      <template #action>
        <n-space justify="space-between">
          <n-button @click="current--">Back</n-button>
          <n-button type="primary" @click="current++">Next</n-button>
        </n-space>
      </template>
    </n-card>
  </n-space>
</template>
