import { IHttpClient } from '@/global/interfaces/http-client';
import { IHttpService } from '@/global/interfaces/http-service';
import { Roles } from '@/global/enums/roles.enum';
import { StaffData } from './models/staff-data';
import { AxiosClient } from '@/global/utils/axios-client';
import { Privileges } from './models/privileges';

class StaffService implements IHttpService {
  httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async editStaff(staffData: StaffData): Promise<void> {
    // TODO: Implement this method (API side)
  }

  async createStaff(staffData: StaffData): Promise<void> {
    // TEMP. solution to align with the current API
    Object.assign(staffData, {
      role: Roles.ASSISTANT,
      password: 'InitPassword1!',
    });

    return this.httpClient.postData<StaffData, void>(
      'staffMembers',
      staffData,
    );
  }

  async updatePrivileges(
    memberId: number,
    privileges: Privileges,
  ): Promise<void> {
    return this.httpClient.patchData<Privileges, void>(
      `staffMembers/updatePrivileges/${memberId}`,
      privileges,
    );
  }
}

export const staffService = new StaffService(new AxiosClient());
