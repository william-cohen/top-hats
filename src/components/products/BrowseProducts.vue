<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
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
import ProductFilters, { FilterOptions } from './filters/ProductFilters.vue'
import { Product } from '@/types/products'

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

    const filters = ref<FilterOptions>({
      category: '',
      color: '',
      priceRange: [1, 800]
    })

    const categoryFilter = (product: Product) =>
      product.type.includes(filters.value.category)

    const colorFilter = (product: Product) =>
      product.color.includes(filters.value.color)

    const priceFilter = (product: Product) =>
      product.price >= filters.value.priceRange[0] &&
      product.price <= filters.value.priceRange[1]

    const displayProducts = computed(() =>
      store.items.filter(categoryFilter).filter(colorFilter).filter(priceFilter)
    )

    return {
      filters,
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
      <n-layout has-sider embedded position="relative">
        <n-layout-sider
          bordered
          content-style="padding: 24px;"
          :native-scrollbar="false"
        >
          <product-filters v-model="filters" />
        </n-layout-sider>
        <n-layout content-style="padding: 24px;" :native-scrollbar="false">
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
