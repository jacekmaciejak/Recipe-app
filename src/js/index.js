// import string from "./models/Search";
// //import { add as a, multiplay, ID } from "./views/searchView";
// import * as searchView from "./views/searchView";
// console.log(
//   `using importeddddd funcions! ${searchView.add(
//     searchView.ID,
//     5
//   )} => ${searchView.multiplay(4, 10)} => ${searchView.multiplay(4, 9)} `
// );

//70e825316658a43a8311c70321ebc460
//Search API URL  https://www.food2fork.com/api/search
//Recipe details API URL   https://www.food2fork.com/api/get

import axios from "axios";
// 1
async function getResault(query) {
  const proxy = "https://cors-anywhere.herokuapp.com/"; //obejscie do strony z API
  const key = "70e825316658a43a8311c70321ebc460"; //klucz API ze strony
  const res = await axios(
    `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`
  ); //zamiast metody fetch, dziala na wszystkich przegladarkach, musimy ja zainstalowac, sluzy do pobierania danych, jako parametr dajemy adres API URL, oddzielamy "?" i dodajemy kolejne parametry
  const recipes = res.data.recipes;
  console.log(recipes);
}
getResault("pizza");
