<script lang="ts">
import { defineComponent } from 'vue'

import {
  GlobalThemeOverrides,
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NSpace
} from 'naive-ui'

import PageHeader from '@/components/header/PageHeader.vue'

export default defineComponent({
  name: 'App',

  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NSpace,
    PageHeader
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
      Select: {
        peers: {
          InternalSelection: {
            textColor: colors['Antique Brass']
          }
        }
      },
      Button: {
        borderHover: colors['Antique Brass'],
        textColorHover: colors['Antique Brass'],
        borderFocus: colors['Antique Brass'],
        textColorFocus: colors['Antique Brass'],
        textColorPressed: colors['Desert Sand'],
        borderPressed: colors['Desert Sand'],
        colorPrimary: colors['Desert Sand'],
        borderPrimary: colors['Desert Sand'],
        colorHoverPrimary: colors['Antique Brass'],
        borderHoverPrimary: colors['Antique Brass'],
        colorFocusPrimary: colors['Antique Brass'],
        borderFocusPrimary: colors['Antique Brass'],
        colorPressedPrimary: colors['Antique Brass']
      },
      Input: {
        borderHover: colors['Antique Brass'],
        borderFocus: colors['Antique Brass']
      },
      Icon: {
        color: colors['Antique Brass']
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
    <n-layout position="absolute">
      <n-layout-header bordered>
        <page-header />
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;" class="bg">
        <div class="container">
          <router-view />
        </div>
      </n-layout-content>
      <n-layout-footer position="absolute" bordered>
        <n-space justify="center">Genertic Footer</n-space>
      </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>
<style lang="scss" scoped>
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 80px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1200px;
}

.bg {
  background-color: #fff1e7;
}
</style>
