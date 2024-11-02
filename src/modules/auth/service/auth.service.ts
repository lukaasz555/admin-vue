import { LoginData } from '../viewModels/login-data';
import { IHttpClient } from '@/global/interfaces/http-client';
import { IHttpService } from '@/global/interfaces/http-service';
import { FetchClient } from '@/global/utils/fetch-client';

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
}

export const authService = new AuthService(new FetchClient());
