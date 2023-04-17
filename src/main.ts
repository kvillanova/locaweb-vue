import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store, key } from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck);

createApp(App)
    .use(store, key)
    .use(router)
    .component('Fa', FontAwesomeIcon)
    .mount('#app');
