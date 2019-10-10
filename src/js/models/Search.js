//70e825316658a43a8311c70321ebc460
//Search API URL  https://www.food2fork.com/api/search
//Recipe details API URL   https://www.food2fork.com/api/get
import axios from "axios";

//-------------- 2 ----------------
export default class Search {
  constructor(query) {
    this.query = query;
  }
  //------------- 1 -------------------
  async getResault() {
    const proxy = "https://cors-anywhere.herokuapp.com/"; //obejscie do strony z API
    const key = "70e825316658a43a8311c70321ebc460"; //klucz API ze strony
    //try - catch, wyswietli blad jesli jest zle zapytanie
    try {
      const res = await axios(
        `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`
      ); //zamiast metody fetch, dziala na wszystkich przegladarkach, musimy ja zainstalowac, sluzy do pobierania danych, jako parametr dajemy adres API URL, oddzielamy "?" i dodajemy kolejne parametry
      this.result = res.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
