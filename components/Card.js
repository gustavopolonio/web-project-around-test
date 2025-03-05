export default class Card {
  constructor(data, cardSeletor, handleCardClick, handlePopupConfirmationOpen, handleLikeAction) {
    this._isLiked = data.isLiked
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSeletor;
    this.handleCardClick = handleCardClick;
    this.handlePopupConfirmationOpen = handlePopupConfirmationOpen;
    this._id = data._id
    this.owner = data.owner
    this.handleLikeAction = handleLikeAction
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);


    return cardElement;
  }

  generateCard(userId) {
    this._element = this._getTemplate();


    this._element.querySelector(".elements__image").src = this._image;
    this._element.querySelector(".elements__image").alt = this._text;
    this._element.querySelector(".elements__name-card").textContent =
      this._text;
    this._likeButton();
    this.checkLikeStatus()


    if (userId !== this.owner) {
      this._element.querySelector('.elements__delete-button').classList.add('elements__delete-button_inactive')

    }

    this._deleteCard();
    return this._element;
  }



  _likeButton() {
    this.likeButton = this._element
    .querySelector(".elements__button-image-like")
    if (!this.likeButton) {
      console.error("Botão de like não encontrado.");
      return;
  }
    this.likeButton.addEventListener("click", (evt) => {
      this.handleLikeAction(this);
    });


  }

  checkLikeStatus() {
    if(this._isLiked) {
      this.likeButton.classList.add('elements__button-image-like_isActive')
    }else {
      this.likeButton.classList.remove('elements__button-image-like_isActive')
    }
  }

  updateLikeButton() {
    this._isLiked = !this._isLiked
    this.checkLikeStatus()
}

  handleLikeButton() {
    this.cardLiked.setAttribute("src", "./images/heartButtonBlack.png")
  }

  handleDislikeButon() {
    this.cardDisliked.setAttribute("src", "./images/button_heart.png")
  }

  setEventListeners() {
    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () =>
        this.handleCardClick(this._text, this._image))
  }

  _deleteCard() {
    this._element.querySelector('.elements__delete-button').addEventListener
  ('click', (evt) => {

    this.cardToBeDeleted = evt.target.parentNode

    this.handlePopupConfirmationOpen(this._id)

  })


  }

  handleDeleteCard() {
    this.cardToBeDeleted.remove()
  }

}
