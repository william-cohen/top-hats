<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import { NLayout, NLayoutHeader, NCard } from 'naive-ui'

import { useProducts } from '@/store/products'

import BreadCrumb from '@/components/navigation/BreadCrumb.vue'

export default defineComponent({
  name: 'Products',

  props: {},

  components: {
    NLayout,
    NLayoutHeader,
    NCard,
    BreadCrumb
  },

  setup() {
    const store = useProducts()
    onMounted(() => store.fetchProducts())
  }
})
</script>
<template>
  <n-card>
    <n-layout embedded>
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        <bread-crumb />
      </n-layout-header>
    </n-layout>
    <router-view />
  </n-card>
</template>
