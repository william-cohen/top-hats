import { defineStore } from 'pinia'

import { Product } from '@/store/products'
interface CartEntry {
  item: Product
  quantity: number
}

export type Result = 'Success' | Error

export const useCart = defineStore('cart', {
  state: () => ({
    basket: [] as CartEntry[]
  }),
  getters: {
    totalItems(): number {
      return this.basket
        .map((entry) => entry.quantity)
        .reduce((total, quantity) => total + quantity, 0)
    },
    totalPrice(): number {
      return this.basket
        .map((entry) => entry.item.price * entry.quantity)
        .reduce((total, price) => total + price, 0)
    },
    cartEncoded(): { [i: string]: string } {
      // Pffftgfodggd haha
      return Array.from(
        this.basket
          .flatMap((entry) => Array(entry.quantity).map(() => entry.item.title))
          .entries()
      ).reduce(
        (obj, entry) => ({ ...obj, [entry[0]]: entry[1] }),
        {} as { [i: string]: string }
      )
    }
  },
  actions: {
    addItem(item: Product, quantity: number) {
      if (quantity < 1) return
      const existingProduct = this.basket.find(
        (entry) => entry.item.id === item.id
      )
      if (existingProduct) {
        existingProduct.quantity += quantity
      } else {
        this.basket.push({ item: { ...item }, quantity })
      }
    },
    updateQuantity(itemId: string, newQuantity: number) {
      const existingProduct = this.basket.find(
        (entry) => entry.item.id === itemId
      )
      if (!existingProduct) return
      existingProduct.quantity = newQuantity
    },
    removeItem(index: number) {
      this.basket.splice(index, 1)
    },
    removeAll() {
      this.basket.length = 0
    }
  }
})
