export async function getCategories() {
  const res = await fetch("http://localhost:5232/api/categories");

  if (!res.ok) {
    throw new Error("Categories fetch failed");
  }

  return res.json();
}
