import { defineStore } from 'pinia'

import { Product } from '@/types/products'

interface CartProduct {
  item: Product
  quantity: number
}

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
      for (let i = 0; i < quantity; i++) {
        this.basket.push({ ...item })
      }
    },
    removeItem(index: number) {
      this.basket.splice(index, 1)
    },
    removeAll() {
      this.basket.length = 0
    }
  }
})
