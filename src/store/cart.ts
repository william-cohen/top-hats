import { defineStore } from 'pinia'

import { Product } from '@/types/products'

export const useCart = defineStore('cart', {
  state: () => ({
    basket: [] as Product[]
  }),
  getters: {
    totalItems(): number {
      return this.basket.length
    },
    totalPrice(): number {
      return this.basket.reduce((total, item) => total + item.price, 0)
    }
  },
  actions: {
    addItem(item: Product, quantity: number) {
      if (quantity < 1) return
      this.basket.push(...Array(quantity).map(() => item))
    },
    removeItem(item: Product) {
      const itemId = item.id
      this.basket.splice(
        this.basket.findIndex((item) => item.id === itemId),
        1
      )
    },
    removeAll() {
      this.basket.length = 0
    }
  }
})
