export interface IHttpClient {
  baseURL: string;
  getData<T, R = T>(url: string): Promise<R>;
  postData<T, R = void>(url: string, body: T): Promise<R>;
  patchData<T, R = void>(url: string, body: T): Promise<R>;
  deleteData<T = undefined>(url: string, body?: T): Promise<void>;
  handleApiError<R>(err: unknown): R;
}
