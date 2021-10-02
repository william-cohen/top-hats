<script lang="ts">
import { defineComponent } from 'vue'

import SessionPage from '@/components/session/SessionPage.vue'

export default defineComponent({
  name: 'Login',
  components: { SessionPage }
})
</script>
<template>
  <session-page />
</template>
