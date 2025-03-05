export default class FormValidator {
  constructor(configForm, form) {
    this._form = form;
    this._config = configForm;
    this._inputs = Array.from(this._form.querySelectorAll(this._config.input));
    this._buttonSubmit = this._form.querySelector(this._config.submitButton);
  }

  _showInputError(inputElement) {
    const errorMessage = this._form.querySelector(`.${inputElement.id}-error`);
    errorMessage.textContent = inputElement.validationMessage;

    errorMessage.classList.add(this._config.errorClass);
    inputElement.classList.add("popup__name_no-margin");
  }

  _hideInputError(inputElement) {
    const errorMessage = this._form.querySelector(`.${inputElement.id}-error`);
    errorMessage.textContent = '';
    errorMessage.classList.remove(this._config.errorClass);
    inputElement.classList.remove("popup__name_no-margin");
  }

  _isInputValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
      this._buttonSubmit.disabled = true; // Desabilita o botão
    } else {
      this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
      this._buttonSubmit.disabled = false; // Habilita o botão
    }
  }

  _setEventListener() {
    // Ajusta o estado do botão inicialmente
    this._toggleButtonState();

    // Adiciona o evento de input nos campos
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isInputValid(inputElement); // Valida o input sempre que o usuário digitar
        this._toggleButtonState(); // Atualiza o estado do botão
      });
    });
  }


  loadingText() {
    const originalText = this._buttonSubmit.textContent

    this._buttonSubmit.textContent = 'Salvando...'

    setTimeout(() => {
      this._buttonSubmit.textContent = originalText
    }, 1000)

  }

  enableValidation() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.loadingText()
    });
    this._setEventListener();
  }
}