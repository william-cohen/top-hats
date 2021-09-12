import { defineStore } from 'pinia'

export interface User {
  userId: string
  firstName: string
  lastName: string
}

export const useSession = defineStore('session', {
  state: () => ({
    loggedIn: false,
    user: {} as User
  }),
  getters: {},
  actions: {
    // async signUp() {
    //   this.
    // }
  }
})
