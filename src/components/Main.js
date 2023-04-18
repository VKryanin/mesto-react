import { useEffect, useState } from "react";
import { Api } from "../utils/Api";
import { config } from '../utils/apiConfig'
import { Card } from "./Card";


export function Main(isEditProfilePopupOpen) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([])
    const api = new Api(config);
    useEffect(() => {
        Promise.all([api.getProfile(), api.getCards()])
            .then(([profileData, cardData]) => {
                setUserName(profileData.name)
                setUserDescription(profileData.about)
                setUserAvatar(profileData.avatar)
                setCards(cardData)
            })
    }, [])
    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <img
                        className="profile__avatar"
                        src={userAvatar}
                        alt="Аватар пользователя" />
                    <button
                        type="button"
                        className="profile__avatar-edit"
                        aria-label="Редактировать аватар профиля"
                        onClick={() => !isEditProfilePopupOpen} />
                    <div className="profile__info">
                        <h1 className="profile__title">
                            {userName}
                        </h1>
                        <button
                            type="button"
                            className="profile__button-edit profile__button"
                            title="Редактировать профиль"
                        />
                        <p className="profile__subtitle">
                            {userDescription}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__button-add profile__button"
                    title="Добавить фотографию" />
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card, id) => < Card card={card} key={id} />
                    )}
                </ul>
            </section>
        </main>
    )
}