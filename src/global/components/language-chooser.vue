<template>
  <Select
    v-model="selectedLanguage"
    :items="languageChooserItems"
    :label="$t('Language')"
    @update:model-value="setLang"
  />
</template>

<script setup lang="ts">
import { Language } from '../enums/language.enum';
import { LocalStorage } from '../enums/local-storage.enum';
import { setLanguageFromLS } from '../helpers/set-language-from-ls';
import { SelectItemType } from '../types/select-item.type';
import Select from './select.vue';

const languageChooserItems: SelectItemType[] = [
  {
    value: Language.EN,
    displayText: 'English',
  },
  {
    value: Language.PL,
    displayText: 'Polski',
  },
];

const selectedLanguage = ref<SelectItemType>(languageChooserItems[0]);

function setLang(languageChooserItem: SelectItemType): void {
  selectedLanguage.value = languageChooserItem;
  localStorage.setItem(
    LocalStorage.STORE_LANGUAGE,
    String(languageChooserItem.value),
  );
  setLanguageFromLS();
}

onMounted(() => {
  const langInLS = localStorage.getItem(LocalStorage.STORE_LANGUAGE);
  if (langInLS) {
    const lang = languageChooserItems.find(
      (item) => item.value === langInLS,
    );
    if (lang) selectedLanguage.value = lang;
  }
});
</script>
