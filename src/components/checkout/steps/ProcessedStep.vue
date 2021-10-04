<script lang="ts">
import { useCart } from '@/store/cart'
import { useSession } from '@/store/session'
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'ProcessedStep',

  props: {},

  setup(props) {
    const session = useSession()

    const submitted = ref(false)

    onMounted(async () => {
      submitted.value = false
      // const order = await session.submitOrder()
    })
  }
})
</script>
<template>
  <span>Done</span>
</template>
