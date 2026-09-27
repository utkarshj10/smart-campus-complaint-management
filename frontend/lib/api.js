export const API_URL = "http://127.0.0.1:8000";

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("access_token");
}

export async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.message || "Something went wrong");
  }

  return data;
}