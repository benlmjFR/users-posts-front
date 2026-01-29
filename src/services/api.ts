const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error('API error');
  return res.json();
};

