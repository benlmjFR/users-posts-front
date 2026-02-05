const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function api<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("access_token");

  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}
