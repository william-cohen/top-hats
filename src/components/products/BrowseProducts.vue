<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { NLayout, NLayoutSider, NGrid, NGridItem } from 'naive-ui'

import { useStore } from '@/store'

import ProductCard from '../../components/products/cards/ProductCard.vue'
import ProductFilters, {
  FilterOptions
} from '../../components/products/filters/ProductFilters.vue'
import { Product } from '@/types/products'

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
