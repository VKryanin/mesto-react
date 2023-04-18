import React from 'react';

export function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={props.id}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-form"
          onClick={props.onClose}
          aria-label="Закрыть форму" />
        <h2 className="popup__title">{props.title}</h2>
        <form name="edit-profile" className="popup__form edit-form" noValidate>
          {props.children}
        </form>
      </div>
    </div>
  )
}



