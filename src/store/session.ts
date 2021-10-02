import { backend } from '@/api/backend'
import { defineStore } from 'pinia'

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

      const result = await backend('assign_echo.php', credentials)

      console.log('Backend test', result)
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
