import { handleApiError } from '../helpers/handle-api-error';
import { API } from '../utils/axios';

export async function postData<T, R = void>(
  url: string,
  body: T,
): Promise<R> {
  try {
    const apiRes = await API.post<R>(url, {
      ...body,
    });
    return apiRes.data;
  } catch (err) {
    return handleApiError<R>(err);
  }
}
