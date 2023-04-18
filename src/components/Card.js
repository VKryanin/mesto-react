

export function Card({ card }) {
    return (
        <li className="elements__element">
            <img className="elements__photo" src={card.link} alt={card.name} />
            <div className="elements__info">
                <p className="elements__subtitle">{card.name}</p>
                <div className="card__like-wrapper">
                    <button className="elements__button"></button>
                    <p className="cards__like-count">{card.likes.length}</p>
                </div>
            </div>
            <button className="elements__delete"></button>
        </li>
    )
}