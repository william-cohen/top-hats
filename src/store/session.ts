import { defineStore } from 'pinia'

import { mande } from 'mande'

const backend = mande('/backend')

export enum Result {
  SUCCESS,
  ERROR
}

export const useSession = defineStore('session', {
  state: () => ({
    loggedIn: false,
    userName: ''
  }),
  getters: {},
  actions: {
    /**
     * Stub login action
     */
    async login(credentials: {
      username: string
      password: string
    }): Promise<Result> {
      // Fancy JS sleep
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2000)
      })
      this.loggedIn = true
      this.userName = credentials.username
      return Result.SUCCESS
    },
    /**
     * Stub sign-up action
     */
    async signUp(credentials: { username: string; password: string }) {
      // Stub register
      return await this.login(credentials)
    }
  }
})
