<script lang="ts">
import { defineComponent } from 'vue'

import { NResult, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NotFound',

  components: {
    NResult,
    NButton
  },

  setup() {
    const router = useRouter()
    const goHome = () => router.push({ name: 'Home' })

    return {
      goHome
    }
  }
})
</script>
<template>
  <n-result
    status="404"
    title="404 Not Found"
    description="Don't get angry... but the page you're looking for doesnt exist."
  >
    <template #footer>
      <n-button @click="goHome">Take me home</n-button>
    </template>
  </n-result>
</template>
