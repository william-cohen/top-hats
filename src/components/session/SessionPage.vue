<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  NSpace,
  NCard,
  NButton,
  NH2,
  NSpin,
  NForm,
  NFormItem,
  NInput,
  NAlert
} from 'naive-ui'
import { Result, useSession } from '@/store/session'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SessionPage',

  props: {},

  components: {
    NSpace,
    NCard,
    NButton,
    NH2,
    NSpin,
    NForm,
    NFormItem,
    NInput,
    NAlert
  },

  setup(props) {
    const router = useRouter()
    const session = useSession()

    const model = ref({
      username: '',
      password: ''
    })

    const errorText = ref('')

    const loading = ref(false)
    const login = async () => {
      loading.value = true
      const result = await session.login(model.value)
      if (result instanceof Error) {
        errorText.value = result.message
      } else {
        router.push({ name: 'Products' })
      }
      loading.value = false
    }

    const signUp = async () => {
      loading.value = true
      const result = await session.signUp(model.value)
      if (result instanceof Error) {
        errorText.value = result.message
      } else {
        router.push({ name: 'Products' })
      }
      loading.value = false
    }

    return {
      model,
      loading,
      login,
      signUp,
      errorText
    }
  }
})
</script>
<template>
  <n-space justify="center">
    <n-card
      :segmented="{
        content: 'hard',
        footer: 'soft'
      }"
      style="width: 600px"
    >
      <n-h2>Login / Sign-up</n-h2>
      <n-form :model="model" ref="formRef">
        <n-form-item path="username" label="Username">
          <n-input
            v-model:value="model.username"
            placeholder="Username"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
            type="password"
            v-model:value="model.password"
            :showPasswordToggle="true"
            show-password-on="mousedown"
            placeholder="Password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-alert v-if="errorText" title="Error" type="error">{{
          errorText
        }}</n-alert>
      </n-form>
      <template #action>
        <n-spin :show="loading">
          <n-space justify="center">
            <n-button @click="signUp"> Create account </n-button>
            <n-button type="primary" @click="login"> Login </n-button>
          </n-space>
        </n-spin>
      </template>
    </n-card>
  </n-space>
</template>
