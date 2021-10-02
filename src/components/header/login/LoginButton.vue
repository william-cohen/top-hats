<script lang="ts">
import { computed, defineComponent, h, Ref, VNodeChild } from 'vue'
import { MenuOption, NMenu } from 'naive-ui'
import { RouterLink, useRoute } from 'vue-router'

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
    const route = useRoute()

    const loginOption: Readonly<Ref<MenuOption[]>> = computed(() => [
      {
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
