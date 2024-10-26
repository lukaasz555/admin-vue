import { Privileges as PrivilegesEnum } from '@/global/enums/privileges.enum';

export class Privileges {
  dashboard = PrivilegesEnum.NOT_ALLOWED;
  staff = PrivilegesEnum.NOT_ALLOWED;
  products = PrivilegesEnum.NOT_ALLOWED;
  categories = PrivilegesEnum.NOT_ALLOWED;
}
