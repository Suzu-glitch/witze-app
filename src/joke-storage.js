const STORAGE_KEY = "jokes";

export function getSavedJokes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveJoke(joke) {
  const savedJokes = getSavedJokes();

  if (savedJokes.includes(joke)) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify([joke, ...savedJokes]));
}

export function removeJoke(joke) {
  const remainingJokes = getSavedJokes().filter(
    (savedJoke) => savedJoke !== joke,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(remainingJokes));
}
