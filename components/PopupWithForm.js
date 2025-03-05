import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectPopup, sendForm) {
    super(selectPopup)
    this.sendForm = sendForm;
    this._form = selectPopup.querySelector('form')
    this.inputs = selectPopup.querySelectorAll('input');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this.sendForm(this._getInputValues())
      this.close();
    })


  }

  _getInputValues() {
    const values = {}
    this.inputs.forEach((input) => {
      values[input.name] = input.value
    })
    return values
  }

  close() {
    setTimeout(() => {
      super.close();
      this._form.reset();
    }, 1000)

  }
}