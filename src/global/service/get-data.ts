import { API } from '../utils/axios';

export async function getData<T, R = T>(
  url: string,
  params?: T,
): Promise<R> {
  const apiRes = await API.get<R>(url, { params });
  console.log('api res', apiRes);
  return apiRes.data;
}
