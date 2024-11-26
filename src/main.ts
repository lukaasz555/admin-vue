import { registerPlugins } from '@/plugins';
import 'reflect-metadata';
import App from './App.vue';

const app = createApp(App);
registerPlugins(app);
app.mount('#app');
