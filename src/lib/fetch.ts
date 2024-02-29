const resultHandler = async (result: Response) => {
  const res = await result.json();
  switch (result.status) {
    case 200: {
      return res;
    }
    case 201: {
      return res;
    }
    case 204: {
      return res;
    }
    case 400: {
      throw new Error(res.message);
    }
    case 401: {
      throw new Error(res.message);
    }
    default: {
      throw new Error(res.message);
    }
  }
};

export const PostFetch = async <B, R>(url: string, body: B, accessToken?: string): Promise<R> => {
  const headers = { 'Content-type': 'application/json' };
  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });
  const result = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/${url}`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify(body),
  });
  return resultHandler(result);
};

export const GetFetch = async <T>(url: string, accessToken?: string): Promise<T> => {
  const headers = { 'Content-type': 'application/json' };
  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });
  const result = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/${url}`, {
    method: 'GET',
    credentials: 'include',
    headers,
  });
  return resultHandler(result);
};

export const PutFetch = async <B, R>(url: string, body: B, accessToken?: string): Promise<R> => {
  const headers = { 'Content-type': 'application/json' };
  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });
  const result = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/${url}`, {
    method: 'PUT',
    credentials: 'include',
    headers,
    body: JSON.stringify(body),
  });
  return resultHandler(result);
};
