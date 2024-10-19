import { API } from '../utils/axios';

export async function postData<T, R = void>(
  url: string,
  body: T,
): Promise<R> {
  const apiRes = await API.post<R>(url, {
    ...body,
  });
  console.log('api res', apiRes);
  return apiRes.data;
}
