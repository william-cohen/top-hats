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
      deskey: string
    }): Promise<Result> {
      const salt = Crypto.lib.WordArray.random(128 / 8)
      const key = Crypto.PBKDF2(credentials.password, salt, {
        keySize: 512 / 32,
        iterations: 1000
      })

      const hashedPass = Crypto.SHA256(credentials.password).toString()

      /**
       * Testing stuff
       */
      const encrypted = javascript_des_encryption(key.toString(), 'helloguvner')
      console.log(
        'ENCRYPTED',
        encrypted,
        javascript_des_decryption(key.toString(), encrypted).replaceAll(
          '\0',
          ''
        )
      )
      /** */

      const sessionKey = key.toString()

      const rsa = new JSEncrypt()
      rsa.setPublicKey(
        `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzeoNkRMdN+5juYOl/Hj7
fnvagnkW/PvX4edynxODm63n1t+jtYQobUFDCKoOx5RpBGqaB35Zkd4zQfy+/0ow
TooHCYAdww0uEIXtLRMK06VWOP8hwWhzJHGJUihO+S/vFKoAkHIU3RZvcLinDARr
JcOfaDBIsvHUli95bFN2iX//4nrDxpA4wS6atVkuEHdXOevCuVoAxqtwZyRgfFCX
yuAeZ5RI39AD1uA7DtnKVBq+ByteTBzuS9zLw4pseE3OPvSMwyEm02DRDrqo5CH6
xpaIiOfA2bf/yau90PvYJJZZBfVb56U0rKhv3zzKtLOlU1GUuJQk0CXE32s9/s6x
hwIDAQAB
-----END PUBLIC KEY-----`
      )

      const encryptedSessionKey = rsa.encrypt(sessionKey)

      console.log('encryptedSessionKey', encryptedSessionKey)

      const loginInfo = {
        username: credentials.username,
        password: hashedPass,
        rsa_deskey: encryptedSessionKey || 'Could not encrypted'
      }

      const result = await backend<{
        username: string
        userOutcome: boolean
        PassOutcome: boolean
        decryptedPass: string
      }>('assign_testlogin.php', loginInfo)

      if (result instanceof Error) {
        return result
      }

      console.log('Decrypted pass: ', result.decryptedPass)

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
