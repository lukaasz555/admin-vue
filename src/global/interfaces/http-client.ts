export interface IHttpClient {
  baseURL: string;
  getData<T, R = T>(url: string): Promise<R>;
  postData<T, R = void>(url: string, body: T): Promise<R>;
  patchData<T, R = void>(url: string, body: T): Promise<R>;
  // TODO: add other rest methods after KF-6 merge
  handleApiError<R>(err: unknown): R;
}
