import { defineStore } from 'pinia'

import Crypto from 'crypto-js'
// import JSEncrypt from 'jsencrypt'

import { backend } from '@/api/backend'
import { useCart } from './cart'
import {
  javascript_des_decryption,
  javascript_des_encryption
} from '@/crypto/DES'
import JSEncrypt from 'jsencrypt'

const RSA_PUB_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzeoNkRMdN+5juYOl/Hj7
fnvagnkW/PvX4edynxODm63n1t+jtYQobUFDCKoOx5RpBGqaB35Zkd4zQfy+/0ow
TooHCYAdww0uEIXtLRMK06VWOP8hwWhzJHGJUihO+S/vFKoAkHIU3RZvcLinDARr
JcOfaDBIsvHUli95bFN2iX//4nrDxpA4wS6atVkuEHdXOevCuVoAxqtwZyRgfFCX
yuAeZ5RI39AD1uA7DtnKVBq+ByteTBzuS9zLw4pseE3OPvSMwyEm02DRDrqo5CH6
xpaIiOfA2bf/yau90PvYJJZZBfVb56U0rKhv3zzKtLOlU1GUuJQk0CXE32s9/s6x
hwIDAQAB
-----END PUBLIC KEY-----`

export type Result = 'Success' | Error

export interface Order {
  no: string
}

export const useSession = defineStore('session', {
  state: () => ({
    loggedIn: false,
    userName: '',
    sessionKey: ''
  }),
  getters: {},
  actions: {
    /**
     * Logs in using the php backend
     */
    async login(credentials: {
      username: string
      password: string
      deskey: string
    }): Promise<Result> {
      // Generate session key
      const salt = Crypto.lib.WordArray.random(128 / 8)
      const key = Crypto.PBKDF2(credentials.password, salt, {
        keySize: 512 / 32,
        iterations: 1000
      })
      const sessionKey = key.toString()

      const hashedPass = Crypto.SHA256(credentials.password).toString()
      const encryptedHashedPass = javascript_des_encryption(
        sessionKey,
        hashedPass
      )

      const rsa = new JSEncrypt()
      rsa.setPublicKey(RSA_PUB_KEY)

      const encryptedSessionKey = rsa.encrypt(sessionKey)

      console.log('sessionKey', sessionKey)
      console.log('encryptedSessionKey', encryptedSessionKey)

      const loginInfo = {
        username: credentials.username,
        password: encryptedHashedPass,
        rsa_deskey: encryptedSessionKey || 'Could not encrypted'
      }

      const response = await backend<{
        response: string
      }>('assign_rsalogin.php', loginInfo)

      if (response instanceof Error) {
        return response
      }

      const result =
        response instanceof Error
          ? response
          : (JSON.parse(
              javascript_des_decryption(
                sessionKey,
                response.response
              ).replaceAll('\0', '')
            ) as {
              username: string
              userOutcome: boolean
              passOutcome: boolean
              sessionOutcome: boolean
            })

      if (result instanceof Error) {
        return result
      }

      if (!result.userOutcome) {
        return Error('Unkown username.')
      }

      if (!result.passOutcome) {
        return Error('Incorrect password.')
      }

      if (!result.sessionOutcome) {
        return Error('Oops... something went wrong.')
      }

      this.loggedIn = true
      this.userName = credentials.username
      this.sessionKey = sessionKey

      return 'Success'
    },
    /**
     * Stub sign-up action
     */
    async signUp(credentials: {
      username: string
      password: string
      deskey: string
    }) {
      const signupInfo = {
        username: credentials.username,
        password: Crypto.SHA256(credentials.password).toString(),
        deskey: 'key'
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
