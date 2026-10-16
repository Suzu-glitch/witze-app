const API_URL = "https://witzapi.de/api/joke";
const CATEGORY_URL = "https://witzapi.de/api/category";

export async function fetchJoke(category = "") {
  const url = category ? `${API_URL}?category=${category}` : API_URL;
  const response = await fetch(url);
  const data = await response.json();
  return data[0].text;
}

export async function fetchCategories() {
  const response = await fetch(CATEGORY_URL);
  const data = await response.json();
  return data.map((category) => category.name);
}
