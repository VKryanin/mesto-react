import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as mestoAuth from '../utils/MestoAuth'

export function Signup() {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    mestoAuth.register(email, password)
      .then(() => {
        navigate('/sign-in');
      })
      .catch(err => setErrorMessage(err));
  }

  return (
    <div className="authForm__container">
      <h2 className="authForm__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="authForm__form">

        <input id="email" name="email" type="email" autoComplete="email" value={formValue.email}
          onChange={handleChange} placeholder="Email"/>
        <input id="password" name="password" type="password" autoComplete="new-password" value={formValue.password}
          onChange={handleChange} placeholder="Пароль"/>

        <div className="authForm__button-container">
          <button type="submit" className="authForm__link">Зарегистрироваться</button>
        </div>
      </form>
    </div>
  )
}