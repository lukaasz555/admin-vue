import { LoginData } from '../viewModels/login-data';
import { IHttpClient } from '@/global/interfaces/http-client';
import { IHttpService } from '@/global/interfaces/http-service';
import { AxiosClient } from '@/global/utils/axios-client';
import { ForgotPasswordData } from '../viewModels/forgot-password-data';
import { ChangePasswordData } from '../viewModels/change-password-data';

class AuthService implements IHttpService {
  httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async login(loginData: LoginData): Promise<string> {
    return this.httpClient.postData<LoginData, string>(
      'auth/signin',
      loginData,
    );
  }

  async resetPassword(data: ForgotPasswordData): Promise<void> {
    return this.httpClient.postData<ForgotPasswordData, void>(
      'auth/forgot-password',
      data,
    );
  }

  async sendRecoveryToken(token: string): Promise<void> {
    return this.httpClient.postData<Record<string, unknown>, void>(
      `auth/reset-password/${token}`,
      {},
    );
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    return this.httpClient.patchData<ChangePasswordData, void>(
      'auth/change-password',
      data,
    );
  }
}

export const authService = new AuthService(new AxiosClient());
