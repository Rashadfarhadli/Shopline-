const BASE_URL = "http://localhost:5005/products";

export async function fetchProducts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Məhsullar yüklənərkən xəta baş verdi");
  }
  return await res.json();
}


