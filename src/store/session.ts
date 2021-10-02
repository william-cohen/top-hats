import { backend } from '@/api/backend'
import { defineStore } from 'pinia'

export type Result = 'Success' | Error

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
      const result = await backend<{
        username: string
        userOutcome: boolean
        PassOutcome: boolean
      }>('assign_login.php', credentials)

      console.log('Login result', result)

      if (result instanceof Error) {
        return result
      }

      if (!result.userOutcome) {
        return Error('Unkown username.')
      }

      if (!result.PassOutcome) {
        return Error('Incorrect password.')
      }

      this.loggedIn = true
      this.userName = credentials.username
      return 'Success'
    },
    /**
     * Stub sign-up action
     */
    async signUp(credentials: { username: string; password: string }) {
      const result = await backend<{ username: string; outcome: boolean }>(
        'assign_register.php',
        credentials
      )

      console.log('Register result', result)

      if (result instanceof Error) {
        return result
      }

      if (!result.outcome) {
        return Error('Username already taken. You can login instead')
      }

      return await this.login(credentials)
    }
  }
})
