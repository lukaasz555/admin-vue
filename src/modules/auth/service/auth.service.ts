import { postData } from '@/global/service/post-data';

// ! todo -> replace with loginData after merge
type LoginData = {
  email: string;
  password: string;
};

export async function login(loginData: LoginData): Promise<string> {
  return await postData<LoginData, string>('auth/signin', loginData);
}
