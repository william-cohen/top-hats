<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { NButton, NIcon, NBadge } from 'naive-ui'
import { ShoppingCart } from '@vicons/fa'

import { useCart } from '@/store/cart'
import CartDrawer from '@/components/cart/CartDrawer.vue'

export default defineComponent({
  name: 'CartButton',

  components: {
    NButton,
    NIcon,
    NBadge,
    ShoppingCart,
    CartDrawer
  },

  setup(props) {
    const cart = useCart()

    const numItems = computed(() => cart.totalItems)
    const cartOpen = ref(false)

    return {
      numItems,
      cartOpen
    }
  }
})
</script>
<template>
  <n-badge :value="numItems" :max="15">
    <n-button circle @click="cartOpen = true">
      <template #icon>
        <n-icon>
          <shopping-cart />
        </n-icon>
      </template>
    </n-button>
    <cart-drawer v-model:open="cartOpen" />
  </n-badge>
</template>
