import { LocalStorage } from '../enums/local-storage.enum';
import { Language } from '../enums/language.enum';
import i18n from '@/plugins/i18n';

export function setLanguageFromLS(): void {
  const langInLS = localStorage.getItem(LocalStorage.STORE_LANGUAGE);

  if (!langInLS) {
    i18n.global.locale = Language.EN;
    localStorage.setItem(LocalStorage.STORE_LANGUAGE, Language.EN);
  } else {
    i18n.global.locale =
      langInLS === 'pl' ? Language.PL : Language.EN;
  }
}
