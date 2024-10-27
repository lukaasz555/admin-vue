import { API } from '../utils/axios';
import { handleApiError } from '../helpers/handle-api-error';

export async function getData<T, R = T>(
  url: string,
  params?: T,
): Promise<R> {
  try {
    const apiRes = await API.get<R>(url, { params });
    return apiRes.data;
  } catch (err) {
    return handleApiError<R>(err);
  }
}
