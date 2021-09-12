<script lang="ts">
import { computed, defineComponent } from 'vue'

import { NImage, NThing, NList, NListItem, NButton, NIcon } from 'naive-ui'
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
    NIcon
  },

  setup() {
    const cart = useCart()

    const basket = computed(() => cart.basket)

    const remove = (index: number) => cart.removeItem(index)

    return {
      basket,
      remove
    }
  }
})
</script>
<template>
  <n-list bordered>
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
      <slot />
    </template>
  </n-list>
</template>
