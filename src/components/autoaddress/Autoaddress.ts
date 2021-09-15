import { mande } from 'mande'
import { ref, Ref, watch } from 'vue'

function debounce<F extends (...args: any) => void, P extends Parameters<F>>(
  fn: F,
  delay = 400
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

const autocomplete = mande('/address/autocomplete')

const verify = mande('/address/verify')

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

  watch(
    addressRef,
    debounce((addr) => {
      autocomplete
        .get<CompletionResponse>(addr)
        .then((response) => (completions.value = response.completions))
    })
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
      verify
        .get<ValidationResonse>(addr)
        .then((response) => (isValid.value = response.matched))
    })
  )

  return {
    isValid: isValid as Readonly<Ref<boolean>>
  }
}
