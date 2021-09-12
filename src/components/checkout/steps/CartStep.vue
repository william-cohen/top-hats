<script lang="ts">
import { computed, defineComponent } from 'vue'

import { NH1, NList, NListItem, NThing } from 'naive-ui'

import CartList from '@/components/cart/CartList.vue'
import { useCart } from '@/store/cart'

export default defineComponent({
  name: 'CartStep',

  components: { CartList, NH1, NList, NListItem, NThing },

  emits: {
    valid: (isValid: boolean) => typeof isValid === 'boolean'
  },

  setup() {
    const cart = useCart()

    const items = cart.totalItems
    const quantifier = computed(() =>
      cart.totalItems === 1 ? 'item' : 'items'
    )

    const total = computed(() => `$${cart.totalPrice.toFixed(2)}`)
    const subtotal = computed(() => `$${(cart.totalPrice * 0.9).toFixed(2)}`)
    const gst = computed(() => `$${(cart.totalPrice * 0.1).toFixed(2)}`)

    return {
      items,
      quantifier,
      total,
      gst,
      subtotal
    }
  }
})
</script>
<template>
  <n-h1>Your cart: {{ items }} {{ quantifier }}</n-h1>
  <cart-list>
    <n-list>
      <n-list-item>
        <n-thing title="Sub-total" :title-extra="subtotal" />
      </n-list-item>
      <n-list-item>
        <n-thing title="GST" :title-extra="gst" />
      </n-list-item>
      <n-list-item>
        <n-thing title="Total" :title-extra="total" />
      </n-list-item>
    </n-list>
  </cart-list>
</template>
