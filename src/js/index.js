import Search from "./models/Search";

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
  const query = "pizza"; //TODO

  if (query) {
    //2)New search object and add to state
    state.search = new Search(query);
    //3)Prepare UI for results
    //4)Search for recipes
    await state.search.getResault();
    //5)Render results on UI
    console.log(state.search.result);
  }
};
document.querySelector(".search").addEventListener("submit", e => {
  e.preventDefault(); //powstrzymuje kazdorazowe odswiezanie strony
  controlSearch();
});
// ----------- 3 ----------------
// const search = new Search("pizza");
// console.log(search);
// search.getResault();
