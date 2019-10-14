import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import {
  elements,
  renderLoader,
  clearLoader
} from "./views/base";

/**Global state of the app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -Liked recipes
 */
//------------- 4 ---------------
const state = {};
//----------SEARCH CONTROLLER---------
const controlSearch = async () => {
  //1) Get query from view
  const query = searchView.getInput();

  if (query) {
    //2)New search object and add to state
    state.search = new Search(query);
    //3)Prepare UI for results
    searchView.clearInput(); //wywolanie funkcji z searchView
    searchView.clearResult(); //wywolanie funkcji z searchResList
    renderLoader(elements.searchRes); //wywolanie funkcji loadera
    try {
      //4)Search for recipes
      await state.search.getResault();
      //5)Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert("Something wrong with the search");
      clearLoader();
    }
  }
};
//funkcja wyszukujaca przepisow w API
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault(); //powstrzymuje kazdorazowe odswiezanie strony
  controlSearch();
});

//funkcja obslugujaca przycisk przejscia do anstepnej strony
elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline"); //metoda closest powoduje ze caly przycisk bedzie reagowal na nacisniecie
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10); //to integer
    searchView.clearResult(); //wywolanie funkcji z searchResList
    searchView.renderResults(state.search.result, goToPage);
  }
});

//----------RECIPE CONTROLLER---------

const controlRecipe = async () => {
  //get ID from url
  const id = window.location.hash.replace("#", ""); //pobranie adresu id z adresu przegladarki i zamiana # na pusty znak, dziala w tylko konsoli
  console.log(id);

  if (id) {
    //Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    //Highlight selected search item
    if (state.search) searchView.highlightSelected(id);
    //Create new recipe object
    state.recipe = new Recipe(id); //nowy obiekt

    try {
      //Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      //Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      //Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      alert("Error processing recipe!");
    }
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach(e => window.addEventListener(e, controlRecipe)); //to samo co powyzej ale zapisane w jednej linii

//Handling recipe button clicks
elements.recipe.addEventListener("click", e => {
  // * w klasie oznacza, ze wszystkie dzieci elementu o klasie .btn-decrease beda reagowaly na klikniecie
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    //Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    //Increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  }
});