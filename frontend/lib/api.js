export const API_URL = "http://127.0.0.1:8000";

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return sessionStorage.getItem("access_token");
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
    if (response.status === 401) {
      sessionStorage.removeItem("access_token");

      if (typeof window !== "undefined") {
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/";
      }

      throw new Error("Session expired. Please log in again.");
    }

    throw new Error(data.detail || data.message || "Something went wrong");
  }

  return data;
}
