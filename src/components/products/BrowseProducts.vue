<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NGrid,
  NGridItem,
  NCard
} from 'naive-ui'

import { useStore } from '@/store'

import BreadCrumb from '../navigation/BreadCrumb.vue'
import ProductCard from './cards/ProductCard.vue'
import ProductFilters from './filters/ProductFilters.vue'

export default defineComponent({
  name: 'BrowseProducts',

  props: {},

  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NGrid,
    NGridItem,
    NCard,
    BreadCrumb,
    ProductCard,
    ProductFilters
  },

  setup(props) {
    const store = useStore()

    const displayProducts = computed(() => store.items)

    return {
      displayProducts
    }
  }
})
</script>
<template>
  <n-card>
    <n-layout embedded>
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        <bread-crumb />
      </n-layout-header>
      <n-layout has-sider embedded>
        <n-layout-sider bordered content-style="padding: 24px;">
          <product-filters />
        </n-layout-sider>
        <n-layout content-style="padding: 24px;">
          <n-grid :x-gap="12" :y-gap="8" :cols="4">
            <n-grid-item v-for="product in displayProducts" :key="product.id">
              <product-card :product="product" />
            </n-grid-item>
          </n-grid>
        </n-layout>
      </n-layout>
    </n-layout>
  </n-card>
</template>
