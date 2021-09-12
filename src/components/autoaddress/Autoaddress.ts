import { mande } from 'mande'
import { ref, Ref, watch } from 'vue'

const autoaddress = mande('https://api.addressfinder.io/api/au/address', {
  headers: {
    origin: 'https://tophats.website',
    referer: 'https://tophats.website/'
  }
})

export interface AddressCompletion {
  full_address: string
}

interface CompletionResponse {
  completions: AddressCompletion[]
}

interface ValidationResonse {
  success: boolean
  matched: boolean
}

export const useAddressCompletion = (
  addressRef: Ref<string>
): { completions: Readonly<Ref<AddressCompletion[]>> } => {
  const completions = ref<AddressCompletion[]>([])

  watch(addressRef, (addr) => {
    autoaddress
      .get<CompletionResponse>('autocomplete', {
        query: {
          q: addr,
          key: 'MFQ93YPXGETJ7DKWLN48',
          format: 'json',
          max: 7,
          wv: '3.25.0',
          session: 'd819b650-85fc-45d4-8ea7-83632bb36722'
        }
      })
      .then((response) => (completions.value = response.completions))
  })

  return {
    completions: completions as Readonly<Ref<AddressCompletion[]>>
  }
}

export const useAddressValidation = (
  addressRef: Ref<string>
): { isValid: Readonly<Ref<boolean>> } => {
  const isValid = ref<boolean>(false)

  watch(addressRef, (addr) => {
    autoaddress
      .get<ValidationResonse>('verification', {
        query: {
          q: addr,
          key: 'MFQ93YPXGETJ7DKWLN48',
          format: 'json',
          max: 7,
          wv: '3.25.0',
          session: '22ab420b-bf58-4fdd-8383-7e57cdb9c26d'
        }
      })
      .then((response) => (isValid.value = response.matched))
  })

  return {
    isValid: isValid as Readonly<Ref<boolean>>
  }
}
