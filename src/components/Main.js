import { useEffect, useState } from "react";
import { Api } from "../utils/Api";
import { config } from '../utils/apiConfig'
import { Card } from "./Card";


export function Main(props) {
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
            .catch((err) => { console.log(`Возникла глобальная ошибка, ${err}`) })
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
                        onClick={props.onEditAvatar} />
                    <div className="profile__info">
                        <h1 className="profile__title">
                            {userName}
                        </h1>
                        <button
                            type="button"
                            className="profile__button-edit profile__button"
                            title="Редактировать профиль"
                            onClick={props.onEditProfile}
                        />
                        <p className="profile__subtitle">
                            {userDescription}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__button-add profile__button"
                    title="Добавить фотографию"
                    onClick={props.onAddPlace} />
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => {
                    return < Card
                        link={card.link}
                        name={card.name}
                        likeCount={card.likes.length}
                        onCardClick={props.onCardClick}
                        onCardDelete={props.onCardDelete}
                        card={card}
                        key={card._id}
                    />}
                    )}
                </ul>
            </section>
        </main>
    )
}