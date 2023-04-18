import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export function PopupEditAvatar(props) {
    return (
        < PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            id='avatar-popup'
            title='Обновить аватар'
            type='user-avatar' >
            <label htmlFor="avatar-input" className="popup__label">
                <input name="avatar"
                    className="popup__input popup__input-avatar"
                    id="avatar"
                    placeholder="Введите ссылку на аватар"
                    type="url"
                    minLength="2"
                    maxLength="200"
                    required />
                <span className="popup__span popup__text-error avatar-error"></span>
            </label>
        </PopupWithForm>
    )
}