<script lang="ts">
import { computed, defineComponent } from 'vue'

import {
  NDrawer,
  NDrawerContent,
  NList,
  NListItem,
  NButton,
  NIcon,
  NImage,
  NThing,
  NAlert,
  NStatistic
} from 'naive-ui'
import { Times, ShoppingBasket } from '@vicons/fa'
import { useCart } from '@/store/cart'

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
    NList,
    NListItem,
    NButton,
    NIcon,
    NImage,
    NThing,
    NAlert,
    NStatistic,
    Times,
    ShoppingBasket
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

    const remove = (index: number) => cart.removeItem(index)

    return {
      basket,
      empty,
      total,
      show,
      remove
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
      <n-list bordered v-else>
        <n-list-item v-for="(item, i) in basket" :key="i">
          <n-thing>
            <template #avatar>
              <n-image :width="60" :src="item.img" />
            </template>
            <template #header> {{ item.title }} </template>
            <template #header-extra>
              <n-button text @click="remove(i)">
                <template #icon>
                  <n-icon>
                    <times />
                  </n-icon>
                </template>
              </n-button>
            </template>
            <template #description> ${{ item.price }} </template>
          </n-thing>
        </n-list-item>
        <template #footer>
          <n-statistic label="Total">${{ total }}</n-statistic>
        </template>
      </n-list>
      <n-button type="primary" class="checkout button">Checkout</n-button>
    </n-drawer-content>
  </n-drawer>
</template>
<style lang="scss" scoped>
.checkout.button {
  width: 100%;
}
</style>
