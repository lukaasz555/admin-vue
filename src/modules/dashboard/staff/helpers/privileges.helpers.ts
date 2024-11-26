import { Privileges as PrivilegesEnum } from '@/global/enums/privileges.enum';
import { TranslateResult } from 'vue-i18n';
import i18n from '@/plugins/i18n';

// TODO: add translations
export function getPrivilegeName(
  privilege: PrivilegesEnum,
): TranslateResult {
  switch (privilege) {
    case PrivilegesEnum.READONLY:
      return i18n.global.t('Readonly');
    case PrivilegesEnum.FULL:
      return i18n.global.t('Full');
    case PrivilegesEnum.MANAGE:
      return i18n.global.t('Manage');
    case PrivilegesEnum.NOT_ALLOWED:
      return i18n.global.t('Not allowed');
    default:
      throw new Error('Unknown privilege');
  }
}
