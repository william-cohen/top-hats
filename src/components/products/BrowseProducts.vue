<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { NLayout, NLayoutSider, NGrid, NGridItem } from 'naive-ui'

import { useProducts, Product } from '@/store/products'

import ProductCard from '../../components/products/cards/ProductCard.vue'
import ProductFilters, {
  FilterOptions
} from '../../components/products/filters/ProductFilters.vue'

export default defineComponent({
  name: 'BrowseProducts',

  components: {
    NLayout,
    NLayoutSider,
    NGrid,
    NGridItem,
    ProductCard,
    ProductFilters
  },

  setup() {
    const store = useProducts()

    const filters = ref<FilterOptions>({
      sortBy: 'none',
      priceRange: [1, 3300]
    })

    const priceFilter = (product: Product) =>
      product.price >= filters.value.priceRange[0] &&
      product.price <= filters.value.priceRange[1]

    const sortBy =
      () =>
      (a: Product, b: Product): number => {
        switch (filters.value.sortBy) {
          case 'none':
            return 0
          case 'title':
            if (a.title < b.title) return -1
            if (a.title > b.title) return 1
            return 0
          case 'price':
            return a.price - b.price
        }
      }

    const displayProducts = computed(() =>
      store.items.filter(priceFilter).sort(sortBy())
    )

    return {
      filters,
      displayProducts
    }
  }
})
</script>
<template>
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
</template>
