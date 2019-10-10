import Search from "./models/Search";
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

    //4)Search for recipes
    await state.search.getResault();
    //5)Render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
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
