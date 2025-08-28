import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './routers/rutas.js';


createApp(App)
  .use(router)
  .mount('#app');
