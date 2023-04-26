import React, { useState, useEffect } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { PopupEditAvatar } from "./PopupEditAvatar";
import { PopupEditProfile } from "./PopupEditProfile";
import { PopupAddCard } from "./PopupAddCard";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from "../utils/Api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([api.getProfile(), api.getCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData)
        setCards(cardData)
      })
      .catch((err) => { console.log(`Возникла глобальная ошибка, ${err}`) })
  }, [])
  // обн. пользователя
  function handleUpdateUser(userData) {
    console.log(userData);
    api.patchUserData(userData.name, userData.about)
      .then((res) => { setCurrentUser(res); closeAllPopups() })
      .catch((err) => { console.log(`Возникла ошибка при редактировании профиля, ${err}`) })
  }
  // ред. аватара
  function handleUpdateAvatar(link) {
    api.patchUserPhoto(link)
      .then((res) => { setCurrentUser(res); closeAllPopups() })
      .catch((err) => { console.log(`Возникла ошибка при зименении аватара, ${err}`) })
  }
  // попап изм. аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  // попап изм профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  // попап доб. карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  // доб. карточки
  function handleAddCard(cardItem) {
    api.addNewCard(cardItem.name, cardItem.link)
      .then((card) => { setCards([card, ...cards]); closeAllPopups() })
      .catch((err) => { console.log(`Возникла ошибка при добавлении новой карточки, ${err}`) })
  }
  // удаление карточки
  function handleCardDelete() {
    setIsDeleteOpen(true)
  }
  // попап карточки
  function handleCardClick(cardItem) {
    setIsImageOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: cardItem.name,
      link: cardItem.link
    })
  }
  // лайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(cardItem => cardItem._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((cardsItem) => {
        setCards((state) => state.map((cardItem) => cardItem._id === card._id ? cardsItem : cardItem))
      })
      .catch((err) => { console.log(`Возникла ошибка при обработке лайков, ${err}`) })
  }
  // закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
    setIsDeleteOpen(false);
  }
  return (
    < CurrentUserContext.Provider value={currentUser} >
      <>
        < Header />
        < Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          cards={ cards } />
        < Footer />
        {/* < PopupWithForm
          isOpen={isDeleteOpen}
          onClose={closeAllPopups}
          id='delete-card'
          title='Вы уверены?'
          type='delete-card'
          buttonText='Да' /> */}
        < ImagePopup
          isOpen={isImageOpen}
          onClose={closeAllPopups}
          card={selectedCard} />
        < PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        < PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        < PopupAddCard
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard} />
      </>
    </CurrentUserContext.Provider>
  );
}


export default App;
