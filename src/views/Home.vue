<script lang="ts">
import { defineComponent } from 'vue'

import { NSpace, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',

  components: {
    NSpace,
    NButton
  },

  setup() {
    const router = useRouter()
    const navigateproducts = () => {
      router.push('products')
    }

    return {
      navigateproducts
    }
  }
})
</script>
<template>
  <div class="home">
    <n-space>
      <n-button @click="navigateproducts">Default</n-button>
    </n-space>
  </div>
</template>
