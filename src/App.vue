<script lang="ts">
import { defineComponent } from 'vue'

import { GlobalThemeOverrides, NConfigProvider } from 'naive-ui'

export default defineComponent({
  name: 'App',

  components: {
    NConfigProvider
  },

  setup() {
    /**
     * https://coolors.co/cb997e-ddbea9-ffe8d6-b7b7a4-a5a58d-6b705c
     */
    const colors = {
      'Antique Brass': '#cb997e',
      'Desert Sand': '#ddbea9',
      'Champagne Pink': '#ffe8d6',
      'Ash Gray': '#b7b7a4',
      Artichoke: '#a5a58d',
      Ebony: '#6b705c'
    }

    const themeOverrides: GlobalThemeOverrides = {
      common: {
        primaryColor: colors['Antique Brass'],
        hoverColor: colors['Antique Brass']
      },
      Button: {
        textColor: colors['Antique Brass']
      },
      Select: {
        peers: {
          InternalSelection: {
            textColor: colors['Antique Brass']
          }
        }
      },
      Tag: {
        // textColor: colors['Antique Brass']
        textColorHoverCheckable: colors['Antique Brass'],
        colorCheckedHover: colors['Antique Brass']
      },
      Breadcrumb: {
        itemTextColorHover: colors['Antique Brass']
      },
      Menu: {
        itemTextColorHover: colors['Antique Brass']
      },
      Avatar: {
        color: 'white'
      }
      // ...
    }

    return {
      themeOverrides
    }
  }
})
</script>
<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>
