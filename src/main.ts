import App from './App.vue';
import { createApp } from 'vue';
import { registerPlugins } from '@/plugins';
import { isCanLogin } from '@/core';

import '@/css/main.css'

const app = createApp(App);

registerPlugins(app);

app.mount('#app');

await isCanLogin();
