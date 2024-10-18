import type { App } from 'vue';
import vuetify from './vuetify';
import pinia from './pinia';
import router from './router';
import i18n from './i18n';

export function registerPlugins(app: App) {
  app.use(vuetify).use(router).use(pinia).use(i18n);
}
