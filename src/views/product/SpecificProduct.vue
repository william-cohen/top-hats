<script lang="ts">
import { defineComponent } from 'vue'

import ProductInfoPage from '@/components/products/ProductInfoPage.vue'

export default defineComponent({
  name: 'SpecificProduct',

  props: {
    productId: {
      required: true,
      type: String
    }
  },

  components: { ProductInfoPage }
})
</script>
<template>
  <product-info-page :productId="productId" />
</template>
