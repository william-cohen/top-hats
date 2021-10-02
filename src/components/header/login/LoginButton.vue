<script lang="ts">
import { computed, defineComponent, h, Ref, VNodeChild } from 'vue'
import { MenuOption, NMenu } from 'naive-ui'
import { RouterLink, useRoute } from 'vue-router'
import { useSession } from '@/store/session'

const renderRouterLink =
  (name: string): (() => VNodeChild) =>
  () =>
    h(
      RouterLink,
      {
        to: { name: name }
      },
      () => name
    )

export default defineComponent({
  name: 'LoginButton',

  props: {},

  components: {
    NMenu
  },

  setup(props) {
    const session = useSession()
    const route = useRoute()

    const loginOption: Readonly<Ref<MenuOption[]>> = computed(() => [
      session.loggedIn
        ? {
            label: () => h('a', {}, `Welcome, ${session.userName}!`),
            key: 'welcome',
            disabled: true
          }
        : {
            label: renderRouterLink('Login'),
            key: 'login',
            disabled: route.name === 'Login'
          }
    ])

    return {
      loginOption
    }
  }
})
</script>
<template>
  <n-menu mode="horizontal" :indent="18" :options="loginOption" />
</template>
