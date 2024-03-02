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
export const RefreshFetch = async <R>(url: string): Promise<R> => {
  const headers = { 'Content-type': 'application/json' };
  const result = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/${url}`, {
    method: 'POST',
    headers,
    credentials: 'include',
  });
  return resultHandler(result);
};

export const PostFetch = async <B, R>(url: string, body: B, accessToken?: string): Promise<R> => {
  const headers = { 'Content-type': 'application/json' };
  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });
  const result = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/${url}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    credentials: 'include',
  });
  return resultHandler(result);
};

export const GetFetch = async <T>(url: string, accessToken?: string): Promise<T> => {
  const headers = { 'Content-type': 'application/json' };
  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });
  const result = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/${url}`, {
    method: 'GET',
    headers,
  });
  return resultHandler(result);
};

export const PutFetch = async <B, R>(url: string, body: B, accessToken?: string): Promise<R> => {
  const headers = { 'Content-type': 'application/json' };
  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });
  const result = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/${url}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });
  return resultHandler(result);
};

export const DeleteFetch = async <B, R>(url: string, body: B, accessToken?: string): Promise<R> => {
  const headers = { 'Content-type': 'application/json' };
  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });
  const result = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/${url}`, {
    method: 'Delete',
    headers,
    body: JSON.stringify(body),
  });
  return resultHandler(result);
};

export const FileUpload = async (target: string, payload: File[] | File, accessToken?: string, uri?: string) => {
  const formData = new FormData();

  if (payload instanceof Array) payload.forEach((file, index) => formData.append(`file-${index}`, file));
  else formData.append('file', payload);

  if (uri) formData.append('uri', `${uri}/`);

  const headers = {};
  if (accessToken) Object.assign(headers, { Authorization: `Bearer ${accessToken}` });

  const result = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/upload/${target}`, {
    method: 'POST',
    headers,
    body: formData,
  });
  return resultHandler(result);
};
