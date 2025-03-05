                     
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(selectPopup) {
    super(selectPopup)
    this.imageSrc = selectPopup.querySelector('.popup-image__img');
    this.imageSubtitle = selectPopup.querySelector('.popup-image__subtitle')
  }

  open({imageSrc, subtitleImage}) {

    this.imageSrc.src = imageSrc;
    this.imageSubtitle.textContent = subtitleImage;
    super.open()

  }
}

