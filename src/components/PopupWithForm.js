export function PopupWithForm(title, name) {
  return (
    <div className="popup">
      <div className="popup__container popup__edit-profile">
        <button type="button" className="popup__close-form close-edit"/>
        <h2 className="popup__title"></h2>
        <form name="edit-profile" className="popup__form edit-form" noValidate>
          <input name={name} className="popup__input popup__input-name" id="user-name"
            placeholder="Место для имени" type="text" minLength="2" maxLength="40" required />
          <span className="popup__span user-name-error popup__text-error"></span>
          <input name="description" className="popup__input popup__input-info" id="user-info"
            placeholder="Род дейтельности" type="text" minLength="2" maxLength="200" required />
          <span className="popup__span popup__text-error user-info-error"></span>
          <button type="submit" className="popup__submit-button send-edit" disabled>Сохранить</button>
        </form>
      </div>
    </div>
  )
}



