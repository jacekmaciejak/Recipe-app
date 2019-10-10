import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";

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
    searchView.clearResList(); ////wywolanie funkcji z searchResList
    //4)Search for recipes
    await state.search.getResault();
    //5)Render results on UI
    searchView.renderResults(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault(); //powstrzymuje kazdorazowe odswiezanie strony
  controlSearch();
});
// ----------- 3 ----------------
// const search = new Search("pizza");
// console.log(search);
// search.getResault();
