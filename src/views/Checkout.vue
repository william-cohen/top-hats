<script lang="ts">
import { defineComponent } from 'vue'

import CheckoutPage from '@/components/checkout/CheckoutPage.vue'

export default defineComponent({
  name: 'Checkout',

  components: { CheckoutPage }
})
</script>
<template>
  <checkout-page />
</template>
