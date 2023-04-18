export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this._authorization = config.authorization
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`et Ошибка: ${res.status}`);
        }
    }

    getProfile() {

        return fetch(`${this._url}users/me/`, {
            headers: this._headers,
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    patchUserData(profileData) {
        return fetch(`${this._url}users/me/`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({ name: profileData.username, about: profileData.description })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    patchUserPhoto(photoLink) {
        return fetch(`${this._url}users/me/avatar/`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({ avatar: photoLink.avatar })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    getCards() {
        return fetch(`${this._url}cards/`, {
            headers: this._headers
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    addNewCard({ name, link }) {
        return fetch(`${this._url}cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({ name, link })
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    addCardLike(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes/`, {
            headers: this._headers,
            method: 'PUT'
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

    removeCardLike(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes/`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(res => {
                return this._getResponseData(res);
            })
    }

}
