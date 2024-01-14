// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // Asegúrate de que la ruta sea correcta
import router from './router';

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')