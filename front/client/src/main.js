import { createApp } from 'vue'
import router from './router'
import { createVuetify } from 'vuetify';
import { VTextField, VForm, VSheet } from 'vuetify/components';
import App from './App.vue'

const vuetify = createVuetify({
    components: {
      VTextField,
      VForm,
      VSheet,
    },
  });

createApp(App)
.use(router)
.use(vuetify)
.mount('#app')
