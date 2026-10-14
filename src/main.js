import "./style.scss";
import { fetchJoke } from "./joke-api.js";

const jokeTextEl = document.querySelector(".current-joke__text");
const generateButtonEl = document.querySelector(".current-joke__generate");

async function displayJoke() {
  const joke = await fetchJoke();
  jokeTextEl.textContent = joke;
}

generateButtonEl.addEventListener("click", displayJoke);
