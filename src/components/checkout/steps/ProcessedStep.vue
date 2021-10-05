<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

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

    onMounted(async () => {
      submitted.value = false
      // const order = await session.submitOrder()
      setTimeout(() => {
        submitted.value = true
        cart.removeAll()
      }, 1500)
    })

    return {
      submitted
    }
  }
})
</script>
<template>
  <n-alert v-if="submitted" title="Order placed successfully" type="success">
    Your hats will arive in 1-2 business weeks
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
    <n-h3>Your orders</n-h3>
    <n-timeline item-placement="left">
      <n-timeline-item
        title="Order no. #1432"
        content="success content"
        time="2018-04-03 20:46"
      />
      <n-timeline-item
        title="Order no. #4325"
        content="success content"
        time="2018-04-03 20:46"
      />
      <n-timeline-item
        title="Order no. #3425"
        content="success content"
        time="2018-04-03 20:46"
      />
    </n-timeline>
  </template>
</template>
