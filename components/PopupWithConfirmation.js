import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selectPopup) {
    super(selectPopup); //esse popup np caso sera a section popup-delete
    this.confirmButton = this.popup.querySelector('.popup-delete__confirm-button') //pegou o botao de confirmar
  }

  handleConfirm(action) {
    this._handleConfirm = action;

  }

  setEventListeners() {
    this.confirmButton.addEventListener('click', () => {
      this._handleConfirm()

    })

    super.setEventListeners()
  }
}
