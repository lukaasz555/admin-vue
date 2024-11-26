import { IHttpClient } from '@/global/interfaces/http-client';
import { IHttpService } from '@/global/interfaces/http-service';
import { DashboardRolePrivilegeLimitType } from '@/global/types/dashboard-role-privilege-limit.type';
import { AxiosClient } from '@/global/utils/axios-client';

class DashboardService implements IHttpService {
  httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getPrivilegesLimits(): Promise<DashboardRolePrivilegeLimitType> {
    const privilegesLimits =
      await this.httpClient.getData<DashboardRolePrivilegeLimitType>(
        'permissions',
      );

    return privilegesLimits;
  }
}

export const dashboardService = new DashboardService(
  new AxiosClient(),
);
