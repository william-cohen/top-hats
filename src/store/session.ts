import { defineStore } from 'pinia'

import Crypto from 'crypto-js'
// import JSEncrypt from 'jsencrypt'

import { backend } from '@/api/backend'

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
      deskey: string
    }): Promise<Result> {

      const CryptoJSAesJson = {
        stringify: function (cipherParams: any) {
            const j: any = {ct: cipherParams.ciphertext.toString(Crypto.enc.Base64)};
            if (cipherParams.iv) 
              j.iv = cipherParams.iv.toString();
            if (cipherParams.salt)
              j.s = cipherParams.salt.toString();
            return JSON.stringify(j);
        },
        parse: function (jsonStr : any)
        {
            const j = JSON.parse(jsonStr);
            const cipherParams = Crypto.lib.CipherParams.create({ciphertext: Crypto.enc.Base64.parse(j.ct)});
            if (j.iv)
              cipherParams.iv = Crypto.enc.Hex.parse(j.iv)
            if (j.s)
              cipherParams.salt = Crypto.enc.Hex.parse(j.s)
            return cipherParams;
        }
    }

      const salt = Crypto.lib.WordArray.random(128/8);
      const key = Crypto.PBKDF2(credentials.password, salt, { keySize: 512/32, iterations: 1000 }); 
      //const keyString = key.toString();
      const keyString = "12345678";

      const hashedPass = Crypto.SHA256(credentials.password).toString();
      
      //const encryptedPass = Crypto.DES.encrypt(hashedPass, keyString).toString();

      //const encryptedPass = Crypto.AES.encrypt(JSON.stringify("value to encrypt"), "12345678", {format: CryptoJSAesJson}).toString();

      const loginInfo = {
        username: credentials.username,
        password: hashedPass,
        deskey: keyString
      }

      console.log('HASHED STUFF ', loginInfo)

      const result = await backend<{
        username: string
        userOutcome: boolean
        PassOutcome: boolean
        decryptedPass: string
      }>('assign_login.php', loginInfo)



      if (result instanceof Error) {
        return result
      }

      console.log("Decrypted pass: ", result.decryptedPass);

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
    async signUp(credentials: { username: string; password: string ; deskey: string ; }) {
      const signupInfo = {
        username: credentials.username,
        password: Crypto.SHA256(credentials.password).toString(),
        deskey: "key"
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
    }
  }
})
