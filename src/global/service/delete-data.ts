import { handleApiError } from '../helpers/handle-api-error';
import { API } from '../utils/axios';

export async function deleteData<T = undefined>(
  url: string,
  body?: T,
): Promise<void> {
  try {
    await API.delete(url, {
      ...body,
    });
  } catch (err) {
    return handleApiError<void>(err);
  }
}
