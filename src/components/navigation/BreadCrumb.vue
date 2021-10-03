<script lang="ts">
import { computed, defineComponent } from 'vue'

import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '@/store/products'

export default defineComponent({
  name: 'BreadCrumb',

  props: {},

  components: {
    NBreadcrumb,
    NBreadcrumbItem
  },

  setup() {
    const router = useRouter()
    const route = useRoute()
    const products = useProducts()

    const productName = computed(
      () =>
        products.items.find((p) => p.id === route.params['productId'])?.title ||
        'Hat'
    )

    const navigateTo = (name: string) => router.push({ name })

    return {
      navigateTo,
      productName
    }
  }
})
</script>
<template>
  <n-breadcrumb>
    <n-breadcrumb-item @click="navigateTo('Products')">
      Products
    </n-breadcrumb-item>
    <n-breadcrumb-item v-if="productName">{{ productName }}</n-breadcrumb-item>
    <n-breadcrumb-item v-else>All</n-breadcrumb-item>
  </n-breadcrumb>
</template>
