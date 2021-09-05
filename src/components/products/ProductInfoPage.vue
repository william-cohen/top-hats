<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'ProductInfoPage',

  props: {
    productName: {
      required: true,
      type: String
    }
  },

  setup(props) {
    const store = useStore()

    const product = computed(
      () =>
        store.items.find((i) => i.title === props.productName) || store.items[0]
    )

    return {
      product
    }
  }
})
</script>
<template>
  <span> Show some product here </span>
</template>
