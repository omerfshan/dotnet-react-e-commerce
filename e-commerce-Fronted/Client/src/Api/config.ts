export const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5232";
export const imageUrl = (path?: string | null) =>
  path ? `${BASE_URL}/images/${path}` : "/images/placeholder.jpg";