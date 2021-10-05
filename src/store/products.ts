import { defineStore } from 'pinia'

import { backend } from '@/api/backend'

export interface Product {
  id: string
  img: string
  title: string
  description: string
  price: number
  date: Date
}

export type Result = 'Success' | Error

export const useProducts = defineStore('products', {
  state: () => ({
    loaded: false,
    items: [] as Product[]
  }),
  actions: {
    getProductById(id: string): Product | null {
      return this.items.find((p) => p.id === id) || null
    },
    async fetchProducts(): Promise<Result> {
      const result = await backend<
        [
          id: string,
          title: string,
          img: string,
          desc: string,
          price: string,
          date: string
        ][]
      >('assign_showproducts.php', {})
      if (result instanceof Error) return result

      this.items = result.map(
        (productTuple): Product => ({
          id: productTuple[0],
          title: productTuple[1],
          img: productTuple[2],
          description: productTuple[3],
          price: Number(productTuple[4]),
          date: new Date(productTuple[5])
        })
      )

      this.loaded = true

      return 'Success'
    }
  }
})
