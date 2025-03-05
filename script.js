import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js'
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Api from "./components/Api.js";
import PopupWithConfirmation from './components/PopupWithConfirmation.js';
const openButton = document.querySelector('.profile__image-edit-button');
const addImageButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('.popup__close-button');
const closeEditButton = document.querySelector('.popup-edit__close-button');
const popupImageCloseButton = document.querySelector('.popup-image__close-button');
const formElement = document.querySelector('.popup');
const formAddImage = document.querySelector('.popup-edit');
const popupImage = document.querySelector('.popup-image');
const popupDeleteConfirmation = document.querySelector('.popup-delete')
const popupEditProfilePicture = document.querySelector('.popup-edit-profile')
const nameUser = document.querySelector('.profile__user')
const ocupationUser = document.querySelector('.profile__paragraph');
const buttonEditProfilePicture = document.querySelector('.profile__edit-icon')
const closeEditProfilePictureButton = document.querySelector('.popup-edit-profile__close-button')





const config = {
  input: 'input',
  submitButton: '.form__submit',
  inactiveButtonClass: '.form__submit_inactive',
  errorClass:'popup__form_name-input-error_active'
}


// ------------INSTANCIAS ABRIR FORMULARIO---------


const openPopupProfile = new Popup(formElement);
openButton.addEventListener('click', () => {
  openPopupProfile.open()
})

const openPopupAddImage = new Popup(formAddImage);
addImageButton.addEventListener('click', () => {
  openPopupAddImage.open()
})

const openEditProfile = new Popup(popupEditProfilePicture)
buttonEditProfilePicture.addEventListener('click', () => {
  openEditProfile.open()
})


// ------------FECHAR FORMULARIO---------

const closePopupProfile = new Popup(formElement)
closeButton.addEventListener('click', () => {
  closePopupProfile.close()
})

const closePopupAddImage = new Popup(formAddImage)
closeEditButton.addEventListener('click', () => {
  closePopupAddImage.close()
})

const closePopupImage = new Popup(popupImage);
popupImageCloseButton.addEventListener('click', () => {
  closePopupImage.close()
})

const closeEditProfile = new Popup(popupEditProfilePicture)
closeEditProfilePictureButton.addEventListener('click', () => {
  closeEditProfile.close()
})


//-------CLICAR NO ESC PARA FECHAR---------

const pressEscCloseModalProfile = new Popup(formElement);
document.addEventListener('keydown', (evt) => {
  pressEscCloseModalProfile.keydownCloseEsc(evt)
})

const pressEscCloseModalAddImage = new Popup(formAddImage);
document.addEventListener('keydown', (evt) => {
  pressEscCloseModalAddImage.keydownCloseEsc(evt)
})

const pressEscCloseModalImage = new Popup(popupImage);
document.addEventListener('keydown', (evt) => {
  pressEscCloseModalImage.keydownCloseEsc(evt)
})

const pressEscCloseModalEditProfilePicture = new Popup(popupEditProfilePicture)
document.addEventListener('keydown', (evt) => {
  pressEscCloseModalEditProfilePicture.keydownCloseEsc(evt)
})


//-------CLICAR EM QUALQUER LUGAR DA TELA PARA FECHAR---------


const clickOutCloseProfile = new Popup(formElement);
clickOutCloseProfile.setEventListeners();

const clickOutCloseAddImage = new Popup(formAddImage);
clickOutCloseAddImage.setEventListeners();

const clickOutCloseImage = new Popup(popupImage);
clickOutCloseImage.setEventListeners();

const clickOutCloseEditProfilePicture = new Popup(popupEditProfilePicture)
clickOutCloseEditProfilePicture.setEventListeners()


//-------ABRIR IMAGEM AO CLICAR---------


const clickOpenPopupImage = new PopupWithImage(popupImage);
document.querySelectorAll('.elements__image').forEach((image) => {
  image.addEventListener('click', () => {
    clickOpenPopupImage.open({
      imageSrc: image.src,
      subtitleImage: image.textContent})
  })
})


//---------CRIAR CARTOES INPUT USUARIO + API--------

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1/",
  headers: {
    authorization: "ef40eba5-5f65-4620-a921-5bfd85fc37bd",
    "Content-Type": "application/json"
  }
})

let userId
api.getUserInfo()
  .then((userData) => {
    document.querySelector('.profile__user').textContent = userData.name;
    document.querySelector('.profile__paragraph').textContent = userData.about;
    document.querySelector('.profile__avatar').src = userData.avatar;
    userId = userData._id;

    const popupEditAvatar = new PopupWithForm(popupEditProfilePicture, (form) => {
      api.editAvatar(form.link)
      .then((info) => {
        document.querySelector('.profile__avatar').src = info.avatar
      })
      .catch((err) => {
        console.log(err)
      })
    })
    popupEditAvatar.setEventListeners()

  })
  .catch((err) => {
    console.log(`Erro ao carregar as informações do usuário`, err)
  })



let section
api.getCards()
  .then((cards) => {
    section = new Section({
      items: cards,
      renderer: (data) => {
        const card = createCard(data)
        section.addItem(card)
        }
      }, '.elements__cards'
    )
    section.renderer();
  })


  .catch((err) => {
    console.log('Erro ao carregar os cartões:', err)
  })

// ------------EDITAR NOME E OCUPACAO NO PERFIL---------

const popupWithFormEditProfile = new PopupWithForm(formElement, (formData) => {

  const userInfo = new UserInfo({name: nameUser, ocupation: ocupationUser})
  userInfo.setUserInfo(formData.name, formData.ocupation)

  api.editProfile(formData.name, formData.ocupation)
  .then((infoProfile) => {
    console.log(infoProfile)
  })
  .catch((err) => {
    console.log('Erro ao atualizar perfil:', err)

  })


})
popupWithFormEditProfile.setEventListeners()


const popupWithAddImage = new PopupWithForm(formAddImage, (formData) => {
  const newCardImage = {name: formData.name,
    link: formData.link
  }

  const newCard = createCard(newCardImage)
  section.addNewItem(newCard)

  api.addNewCard(newCardImage.name, newCardImage.link)
  .then((infoCard) => {
    console.log(infoCard)
  })
  .catch((err) => {
    console.log(`Erro ao atualizar o cartão`, err)
  })
})


// -----INSTANCIA DO POPUP COM COMFIRMACAO -----------

const openPopupDeleteConfirmation = new PopupWithConfirmation(popupDeleteConfirmation)

openPopupDeleteConfirmation.setEventListeners()

popupWithAddImage.setEventListeners()


const openImage = new PopupWithImage(popupImage)

// -------------------------------------------------


 function createCard(data) {
  const newCardUser = new Card(
    data,


    '#card-template',

    () => openImage.open({imageSrc: data.link, subtitleImage: data.name}),

    (cardId) => {
    console.log(cardId)
    openPopupDeleteConfirmation.open()
    openPopupDeleteConfirmation.handleConfirm(() => {
      api.deleteCard(cardId)
      .then(() => {
        console.log(`Cartao ${cardId} excluido`)
      })
      .catch((err) => {
        console.log(err)
      })

      newCardUser.handleDeleteCard();
      openPopupDeleteConfirmation.close()
    })

  },


  (card) => { //esse e o id do cartao que foi curtido
    api.handleLikeAction(card._id, card._isLiked)
    .then(() => {
      card.updateLikeButton()

    })
    .catch((err) => {
      console.log("Erro ao atualizar o like:", err);
    });
      })



  const newCard = newCardUser.generateCard(userId);
  newCardUser.setEventListeners()
  return newCard

 }

// -------------------------------------------------


//Instancia para o popup de editar perfil
const profileFormValidator = new FormValidator(config, document.querySelector('.popup__form'));

const saveButton = document.querySelector('.form__submit')
profileFormValidator.enableValidation()

//Instancia para o popup de editar a imagem
const imagesFormValidator = new FormValidator(config, document.querySelector('.popup-edit__form'));
imagesFormValidator.enableValidation();

const editProfilePicture = new FormValidator(config, document.querySelector('.popup-edit-profile'))
editProfilePicture.enableValidation()












