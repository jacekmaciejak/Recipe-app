import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = []; //wszystkie elementy przekazujemy do tej tablicy
    }

    //Metoda dodajaca nowy item do listy
    addItem(id, count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
    }

}