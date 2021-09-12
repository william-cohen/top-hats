import { mande } from 'mande'
import { ref, Ref, watch } from 'vue'

function debounce<F extends (...args: any) => void, P extends Parameters<F>>(
  fn: F,
  delay = 200
) {
  let timeout: number | null = null
  return function (
    this: (...args: unknown[]) => unknown,
    ...args: Parameters<F>
  ) {
    if (timeout) clearTimeout(timeout)
    timeout = window.setTimeout(() => fn.apply(this, args), delay)
  } as F
}

const autoaddress = mande('https://api.geoapify.com/v1/geocode/autocomplete', {
  headers: {
    origin: 'https://tophats.website/',
    referer: 'https://tophats.website/'
  }
})

export interface AddressCompletion {
  full_address: string
}

interface CompletionResponse {
  features: {
    properties: {
      formatted: string
    }
  }[]
}

export const useAddressCompletion = (
  addressRef: Ref<string>
): { completions: Readonly<Ref<AddressCompletion[]>> } => {
  const completions = ref<AddressCompletion[]>([])

  watch(
    addressRef,
    debounce((addr) => {
      autoaddress
        .get<CompletionResponse>('autocomplete', {
          query: {
            text: addr,
            apiKey: '91ddc8e67d29406b8852c0195ad59dbf'
          }
        })
        .then(
          (response) =>
            (completions.value = response.features.map((feature) => ({
              full_address: feature.properties.formatted
            })))
        )
    }, 300)
  )

  return {
    completions: completions as Readonly<Ref<AddressCompletion[]>>
  }
}

export const useAddressValidation = (
  addressRef: Ref<string>
): { isValid: Readonly<Ref<boolean>> } => {
  const isValid = ref<boolean>(false)

  watch(
    addressRef,
    debounce((addr) => {
      autoaddress
        .get<CompletionResponse>('autocomplete', {
          query: {
            text: addr,
            apiKey: '91ddc8e67d29406b8852c0195ad59dbf'
          }
        })
        .then((response) => {
          isValid.value = response.features.length < 3
        })
    }, 300)
  )

  return {
    isValid: isValid as Readonly<Ref<boolean>>
  }
}
