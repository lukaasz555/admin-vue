import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import pl from '../locales/pl.json';

export default createI18n({
  locale: 'en',
  messages: {
    en,
    pl,
  },
});
