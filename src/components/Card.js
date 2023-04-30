import React from 'react';

export function Card(props) {
    function handleClick() { props.onCardClick(props.card) }
    function handleDelete() { props.onCardDelete(props.card) }
    return (
        <li className="elements__element">
            <img className="elements__photo"
                src={props.link}
                alt={props.name}
                onClick={handleClick} />
            <div className="elements__info">
                <p className="elements__subtitle">{props.name}</p>
                <div className="card__like-wrapper">
                    <button onClick={() => {props.onCardClick(props.card)}} className="elements__button"></button>
                    <p className="cards__like-count">{props.likeCount > 0 ? props.likeCount : null}</p>
                </div>
            </div>
            <button className="elements__delete" onClick={handleDelete}></button>
        </li>
    )
}