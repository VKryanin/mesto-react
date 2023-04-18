import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import { PopupWithForm } from "./PopupWithForm";
import { useEffect, useState } from "react";

function App() {
  const isEditProfilePopupOpen = false
  useEffect(() => (console.log(isEditProfilePopupOpen)), [isEditProfilePopupOpen])
  return (
    <>
      < Header />
      < Main isEditProfilePopupOpen={isEditProfilePopupOpen} />
      < Footer />
      < PopupWithForm />
      {useEffect(() => (console.log(isEditProfilePopupOpen)), [isEditProfilePopupOpen])}
    </>
  );
}


export default App;
