<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'

import { NCard } from 'naive-ui'

import { Product } from '@/store/products'

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
    const router = useRouter()

    const title = computed(() => props.product.title)
    const imgUrl = computed(() => props.product.img)
    const price = computed(() => props.product.price)

    const click = () =>
      router.push({
        name: 'Product',
        params: { productName: props.product.title }
      })

    return {
      title,
      imgUrl,
      price,
      click
    }
  }
})
</script>
<template>
  <n-card :title="title" hoverable class="clickable" @click="click">
    <template #cover>
      <img :src="imgUrl" />
    </template>
    ${{ price }}
  </n-card>
</template>
<style lang="scss" scoped>
.clickable {
  cursor: pointer;
}
</style>
