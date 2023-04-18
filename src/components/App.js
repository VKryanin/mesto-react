import { useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { PopupEditAvatar } from "./PopupEditAvatar";
import { PopupEditProfile } from "./PopupEditProfile";
import { PopupAddCard } from "./PopupAddCard";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardDelete() {
    setIsDeleteOpen(true)
  }
  function handleCardClick(cardItem) {
    setIsImageOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: cardItem.name,
      link: cardItem.link
    })
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
    setIsDeleteOpen(false);
  }
  return (
    <>
      < Header />
      < Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardDelete={handleCardDelete} />
      < Footer />
      < PopupWithForm
        isOpen={isDeleteOpen}
        onClose={closeAllPopups}
        id='delete-card'
        title='Вы уверены?'
        type='delete-card'
        buttonText='Да' />
      < ImagePopup
        isOpen={isImageOpen}
        onClose={closeAllPopups}
        card={selectedCard} />
      < PopupEditAvatar
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups} />
      < PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups} />
      < PopupAddCard
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups} />
    </>
  );
}


export default App;
