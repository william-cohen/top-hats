<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
  NH1,
  NH2,
  NGrid,
  NGridItem,
  NSpace,
  NImage,
  NInputNumber,
  NButton
} from 'naive-ui'

import { useProducts } from '@/store/products'
import { useCart } from '@/store/cart'

export default defineComponent({
  name: 'ProductInfoPage',

  props: {
    productName: {
      required: true,
      type: String
    }
  },

  components: {
    NH1,
    NH2,
    NGrid,
    NGridItem,
    NSpace,
    NImage,
    NInputNumber,
    NButton
  },

  setup(props) {
    const store = useProducts()
    const cart = useCart()

    const product = computed(
      () =>
        store.items.find((i) => i.title === props.productName) || store.items[0]
    )

    const quantity = ref(1)

    const addToCart = () => cart.addItem(product.value, quantity.value)

    return {
      product,
      quantity,
      addToCart
    }
  }
})
</script>
<template>
  <n-space justify="center">
    <n-grid x-gap="12" :cols="2">
      <n-grid-item>
        <n-image width="500" :src="product.img" />
      </n-grid-item>
      <n-grid-item>
        <n-space vertical justify="center" class="description container">
          <n-space justify="center">
            <n-space vertical justify="center" class="center text">
              <n-h1>{{ product.title }}</n-h1>
              <n-h2>${{ product.price }}</n-h2>
              <n-input-number
                v-model:value="quantity"
                placeholder="Quantity"
                :min="1"
                :max="9"
              />
              <n-button type="primary" @click="addToCart">Add to Cart</n-button>
            </n-space>
          </n-space>
        </n-space>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>
<style lang="scss">
// .center.text {
//   text-align: center;
// }
.description.container {
  height: 90%;
}
</style>
