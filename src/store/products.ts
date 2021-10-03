import { Product } from '@/types/products'
import { defineStore } from 'pinia'

import { backend } from '@/api/backend'

export const useProducts = defineStore('products', {
  state: () => ({
    loaded: false,
    items: [] as Product[]
  }),
  actions: {
    async fetchProducts() {
      const result = await backend('assign_showproducts.php', {})
      console.log('Fetch products result', result)
    }
  }
})
