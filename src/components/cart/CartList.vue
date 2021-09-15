<script lang="ts">
import { computed, defineComponent } from 'vue'

import {
  NImage,
  NThing,
  NList,
  NListItem,
  NButton,
  NIcon,
  NSpace,
  NInputNumber
} from 'naive-ui'
import { Times } from '@vicons/fa'

import { useCart } from '@/store/cart'

export default defineComponent({
  name: 'CartList.vue',

  props: {},

  components: {
    Times,
    NImage,
    NThing,
    NList,
    NListItem,
    NButton,
    NIcon,
    NSpace,
    NInputNumber
  },

  setup() {
    const cart = useCart()

    const basket = computed(() => cart.basket)

    const remove = (index: number) => cart.removeItem(index)

    return {
      cart,
      basket,
      remove
    }
  }
})
</script>
<template>
  <n-list bordered>
    <n-list-item v-for="(entry, i) in basket" :key="i">
      <n-thing>
        <template #avatar>
          <n-image :width="60" :src="entry.item.img" />
        </template>
        <template #header> {{ entry.item.title }} </template>
        <template #header-extra>
          <n-button text @click="remove(i)">
            <template #icon>
              <n-icon>
                <times />
              </n-icon>
            </template>
          </n-button>
        </template>
        <template #description>
          <n-input-number
            placeholder="Quantity"
            :min="1"
            :max="9"
            v-model:value="cart.basket[i].quantity"
            size="small"
            class="cart quantity"
          />
        </template>
        <template #footer>
          <n-space> ${{ entry.item.price * entry.quantity }} </n-space>
        </template>
      </n-thing>
    </n-list-item>
    <template #footer>
      <slot />
    </template>
  </n-list>
</template>
<style lang="scss" scoped>
.cart.quantity {
  width: 170px;
}
</style>
