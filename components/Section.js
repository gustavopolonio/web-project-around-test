
export default class Section {
  constructor({items, renderer}, containerSelector) {
   this._vetorItems = items;
    this._render = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderer() {

    this._vetorItems.forEach((item) => {
      this._render(item);
    })

  }

  addItem(card) {
    this._containerSelector.append(card)
  }

  addNewItem(card) {
    this._containerSelector.prepend(card)
    //pega o elemento DOM e adciona ao container

  }
}




