import { TabsMenuItem } from '../../types/tabs-menu-item';
import i18n from '@/plugins/i18n';

type StaffPopupTabItemValue = 'general' | 'privileges';

export const staffPopupTabItems: TabsMenuItem<StaffPopupTabItemValue>[] =
  [
    {
      label: i18n.global.t('General'),
      value: 'general',
    },
    {
      label: i18n.global.t('Privileges'),
      value: 'privileges',
    },
  ];
