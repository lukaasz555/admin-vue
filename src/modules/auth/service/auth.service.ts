import { postData } from '@/global/service/post-data';
import { LoginData } from '../viewModels/login-data';

export async function login(loginData: LoginData): Promise<string> {
  return postData<LoginData, string>('auth/signin', loginData);
}
