<script lang="ts">
import { defineComponent } from 'vue'
import HomePage from '@/components/home/HomePage.vue'

export default defineComponent({
  name: 'Home',

  components: {
    HomePage
  }
})
</script>
<template>
  <div class="home">
    <home-page />
  </div>
</template>
