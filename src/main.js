import { createApp,  } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

// 1. Assign app to a variable
let app = createApp(App)

// 2. Assign the global variable before mounting
app.config.globalProperties.globalVar = ''

// 3. Use router and mount app
app.use(router).mount('#app')

