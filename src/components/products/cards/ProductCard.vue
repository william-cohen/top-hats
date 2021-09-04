<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { NCard } from 'naive-ui'

import { Product } from '@/types/products'

export default defineComponent({
  name: 'ProductCard',

  props: {
    product: {
      required: true,
      type: Object as PropType<Product>
    }
  },

  components: {
    NCard
  },

  setup(props) {
    const title = computed(() => props.product.title)
    const imgUrl = computed(() => props.product.img)
    const price = computed(() => props.product.price)

    return {
      title,
      imgUrl,
      price
    }
  }
})
</script>
<template>
  <n-card :title="title" hoverable>
    <template #cover>
      <img :src="imgUrl" />
    </template>
    ${{ price }}
  </n-card>
</template>
