import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

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

    //Create new recipe object
    state.recipe = new Recipe(id); //nowy obiekt

    try {
      //Get recipe data
      await state.recipe.getRecipe();
      //Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      //Render recipe
    } catch (err) {
      alert("Error processing recipe!");
    }
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach(e => window.addEventListener(e, controlRecipe)); //to samo co powyzej ale zapisane w jednej linii
