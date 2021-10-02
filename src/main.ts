import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useSession } from './store/session'

const pinia = createPinia()

router.beforeEach((to) => {
  const store = useSession()
  if (to.meta.requiresAuth && !store.loggedIn) return '/login'
})

createApp(App).use(router).use(pinia).mount('#app')
