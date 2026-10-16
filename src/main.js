import "./style.scss";
import { fetchJoke, fetchCategories } from "./joke-api.js";
import { getSavedJokes, saveJoke, removeJoke } from "./joke-storage.js";
import { getInitialTheme, applyTheme, saveTheme } from "./theme.js";

const jokeTextEl = document.querySelector(".current-joke__text");
const categorySelectEl = document.querySelector(".current-joke__category");
const generateButtonEl = document.querySelector(".current-joke__generate");
const saveButtonEl = document.querySelector(".current-joke__save");
const savedJokesListEl = document.querySelector(".saved-jokes__list");
const themeToggleEl = document.querySelector(".theme-toggle");

let currentJoke = "";
let currentTheme = getInitialTheme();

applyTheme(currentTheme);

async function displayJoke() {
  currentJoke = await fetchJoke(categorySelectEl.value);
  jokeTextEl.textContent = currentJoke;
  saveButtonEl.classList.remove("current-joke__save--disabled");
}

async function renderCategories() {
  const categories = await fetchCategories();

  categories.forEach((category) => {
    const optionEl = document.createElement("option");
    optionEl.value = category;
    optionEl.textContent = category;
    categorySelectEl.appendChild(optionEl);
  });
}

function renderSavedJokes() {
  const savedJokes = getSavedJokes();
  let html = "";

  savedJokes.forEach((joke) => {
    html += `
      <div class="saved-joke">
        <p class="saved-joke__text">${joke}</p>
        <button type="button" class="saved-joke__remove" aria-label="Witz entfernen">
          <svg
            class="saved-joke__remove-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
            />
          </svg>
        </button>
      </div>
    `;
  });

  if (!html) {
    html = "<em>Noch keine Witze gespeichert.</em>";
  }

  savedJokesListEl.innerHTML = html;

  const removeButtonEls = savedJokesListEl.querySelectorAll(
    ".saved-joke__remove",
  );

  removeButtonEls.forEach((removeButtonEl, index) => {
    removeButtonEl.addEventListener("click", () => {
      removeSavedJoke(savedJokes[index]);
    });
  });
}

function saveCurrentJoke() {
  saveJoke(currentJoke);
  renderSavedJokes();
}

function removeSavedJoke(joke) {
  removeJoke(joke);
  renderSavedJokes();
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(currentTheme);
  saveTheme(currentTheme);
}

generateButtonEl.addEventListener("click", displayJoke);
saveButtonEl.addEventListener("click", saveCurrentJoke);
themeToggleEl.addEventListener("click", toggleTheme);

renderSavedJokes();
renderCategories();
