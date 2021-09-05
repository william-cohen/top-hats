<script lang="ts">
import { defineComponent } from 'vue'

import BrowseProducts from '@/components/products/BrowseProducts.vue'

export default defineComponent({
  name: 'AllProducts',

  components: { BrowseProducts }
})
</script>
<template>
  <browse-products />
</template>
