import { defineStore } from 'pinia'

import Crypto from 'crypto-js'
// import JSEncrypt from 'jsencrypt'

import { backend } from '@/api/backend'
import { useCart } from './cart'

export type Result = 'Success' | Error

export const useSession = defineStore('session', {
  state: () => ({
    loggedIn: false,
    userName: ''
  }),
  getters: {},
  actions: {
    /**
     * Logs in using the php backend
     */
    async login(credentials: {
      username: string
      password: string
    }): Promise<Result> {
      const loginInfo = {
        username: credentials.username,
        password: Crypto.SHA256(credentials.password).toString()
      }

      const result = await backend<{
        username: string
        userOutcome: boolean
        PassOutcome: boolean
      }>('assign_login.php', loginInfo)

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
      const signupInfo = {
        username: credentials.username,
        password: Crypto.SHA256(credentials.password).toString()
      }

      const result = await backend<{ username: string; outcome: boolean }>(
        'assign_register.php',
        signupInfo
      )

      if (result instanceof Error) {
        return result
      }

      if (!result.outcome) {
        return Error('Username already taken. You can login instead')
      }

      return await this.login(credentials)
    },
    async submitOrder(): Promise<Result> {
      const cart = useCart()
      if (!this.loggedIn) return Error('You need to be logged in first.')
      const result = await backend<{ username: string; outcome: boolean }>(
        'assign_submitorder.php',
        {
          username: this.userName,
          ...cart.cartEncoded
        }
      )
      if (result instanceof Error) return result
      if (!result.outcome) return Error('Could not submit order.')

      return 'Success'
    }
  }
})
