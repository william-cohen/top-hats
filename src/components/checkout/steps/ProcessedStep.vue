<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'

import { NAlert, NSpin, NIcon, NTimeline, NTimelineItem, NH3 } from 'naive-ui'
import { Receipt } from '@vicons/fa'

import { useCart } from '@/store/cart'
import { useSession } from '@/store/session'

export default defineComponent({
  name: 'ProcessedStep',

  props: {},

  components: { NAlert, NIcon, NSpin, NTimeline, NTimelineItem, NH3 },

  setup(props) {
    const cart = useCart()
    const session = useSession()

    const submitted = ref(false)
    const errorMessage = ref('')
    const cartItems = computed(() => cart.basket.map((b) => b.item))

    onMounted(async () => {
      submitted.value = false
      const order = await session.submitOrder()

      if (order instanceof Error) {
        errorMessage.value = order.message
        return
      }

      submitted.value = true
      cartItems.value[0].title
    })

    return {
      submitted,
      errorMessage,
      cartItems
    }
  }
})
</script>
<template>
  <n-alert v-if="submitted" title="Order placed successfully" type="success">
    Your hats will arive in 1-2 business weeks
  </n-alert>
  <n-alert v-else-if="errorMessage" title="Oh no..." type="error">
    {{ errorMessage }}
  </n-alert>
  <n-alert v-else title="Processing order..." type="default">
    <template #icon>
      <n-icon>
        <n-spin size="small" />
      </n-icon>
    </template>
  </n-alert>
  <br />
  <template v-if="submitted">
    <n-h3>Your order</n-h3>
    <n-timeline item-placement="left">
      <n-timeline-item
        v-for="item in cartItems"
        :key="item.id"
        :title="item.title"
        :content="item.price"
      />
    </n-timeline>
  </template>
</template>
