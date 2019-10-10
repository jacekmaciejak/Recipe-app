import { elements } from "./base";

//------------------- 5 -------------
export const getInput = () => elements.searchInput.value; //pobiera wartosc z pola search

export const clearInput = () => {
  elements.searchInput.value = ""; //czyszczenie pola wyszukujacego
};
export const clearResList = () => {
  elements.searchResList.innerHTML = ""; //czyszczenie pola z wynikami wyszukiwania
};
//funkcja skracajaca dlugosc tytulu do okrslonej liczby znakow
const limitRecipeTitle = (title, limit = 20) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

//funkcja wyswietlajaca wynik wyszukiwania
const renderRecipe = recipe => {
  //dynamiczne pole z wynikow wyszukiwania
  const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.title
                    )}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
  //wyswietlanie zmiennej markaup w elemencie searchResList pobranym z base.js
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};
//funkcja wykonujaca petle po funkcji powyzej
export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};
