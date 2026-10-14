const API_URL = "https://witzapi.de/api/joke";

export async function fetchJoke() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data[0].text;
}
