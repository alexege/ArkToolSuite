import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')




//Untouched
// import './assets/main.css'

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')