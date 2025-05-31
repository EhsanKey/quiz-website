import { BASE_URL, ACCESS_TOKEN } from '../constants';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  cache?: RequestCache;
  next?: RequestInit['next'];
  headers?: HeadersInit;
}

const request = async (
  method: Method,
  url: string,
  data?: unknown,
  options: RequestOptions = {}
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    ...options.headers,
  };

  const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    cache: options.cache || 'no-store',
  };

  if (options.next) {
    fetchOptions.next = options.next;
  }

  const response = await fetch(`${BASE_URL}${url}`, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return {
    data: await response.json(),
    status: response.status,
    statusText: response.statusText,
  };
};

const fetchInstance = {
  get: (url: string, options: RequestOptions = {}) => request('GET', url, undefined, options),

  post: (url: string, data?: unknown, options: RequestOptions = {}) =>
    request('POST', url, data, options),

  put: (url: string, data?: unknown, options: RequestOptions = {}) =>
    request('PUT', url, data, options),

  delete: (url: string, options: RequestOptions = {}) => request('DELETE', url, undefined, options),

  patch: (url: string, data?: unknown, options: RequestOptions = {}) =>
    request('PATCH', url, data, options),
};

export default fetchInstance;
