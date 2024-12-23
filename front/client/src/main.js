import { createApp } from 'vue'
import router from './router'
import { createVuetify } from 'vuetify';
import { VTextField, VForm, VSheet,VBtn,VRow,VImg,VAlert } from 'vuetify/components';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import App from './App.vue'

const vuetify = createVuetify({
    components: {
      VTextField,
      VForm,
      VSheet,
      VBtn,
      VRow,
      VImg,
      VAlert
    },
  });

createApp(App)
.use(router)
.use(vuetify)
.mount('#app')
