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
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzdxaei6bt/xIAhYsdFdW
62CGTpRX+GXoZkzqvbf5oOxw4wKENjFX7LsqZXxdFfoRxEwH90zZHLHgsNFzXe3J
qiRabIDcNZmKS2F0A7+Mwrx6K2fZ5b7E2fSLFbC7FsvL22mN0KNAp35tdADpl4lK
qNFuF7NT22ZBp/X3ncod8cDvMb9tl0hiQ1hJv0H8My/31w+F+Cdat/9Ja5d1ztOO
YIx1mZ2FD2m2M33/BgGY/BusUKqSk9W91Eh99+tHS5oTvE8CI8g7pvhQteqmVgBb
JOa73eQhZfOQJ0aWQ5m2i0NUPcmwvGDzURXTKW+72UKDz671bE7YAch2H+U7UQea
wwIDAQAB
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
