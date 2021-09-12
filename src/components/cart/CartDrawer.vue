<script lang="ts">
import { computed, defineComponent } from 'vue'

import {
  NDrawer,
  NDrawerContent,
  NButton,
  NIcon,
  NAlert,
  NStatistic
} from 'naive-ui'
import { ShoppingBasket } from '@vicons/fa'
import { useCart } from '@/store/cart'
import CartList from './CartList.vue'

export default defineComponent({
  name: 'CartDrawer',

  props: {
    open: {
      required: true,
      type: Boolean
    }
  },

  emits: {
    'update:open': (value: boolean) => typeof value === 'boolean'
  },

  components: {
    NDrawer,
    NDrawerContent,

    NButton,
    NIcon,

    NAlert,
    NStatistic,
    ShoppingBasket,
    CartList
  },

  setup(props, context) {
    const cart = useCart()

    const basket = computed(() => cart.basket)
    const total = computed(() => cart.totalPrice)

    const empty = computed(() => cart.totalItems === 0)

    const show = computed({
      get() {
        return props.open
      },
      set(open: boolean) {
        context.emit('update:open', open)
      }
    })

    return {
      basket,
      empty,
      total,
      show
    }
  }
})
</script>
<template>
  <n-drawer v-model:show="show" :width="512" placement="right">
    <n-drawer-content title="Cart" closable>
      <n-alert title="Your cart is empty" type="default" v-if="empty">
        <template #icon>
          <n-icon>
            <shopping-basket />
          </n-icon>
        </template>
        Browse the store. Add products. Consume!
      </n-alert>
      <cart-list v-else>
        <n-statistic label="Total">${{ total }}</n-statistic>
        <n-button type="primary" class="checkout button">Checkout</n-button>
      </cart-list>
    </n-drawer-content>
  </n-drawer>
</template>
<style lang="scss" scoped>
.checkout.button {
  width: 100%;
}
</style>
