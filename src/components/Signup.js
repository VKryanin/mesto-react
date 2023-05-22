import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as mestoAuth from '../utils/MestoAuth'
import { Message } from "./Message";

export function Signup() {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [status, setStatus] = useState('')
  const [style, setStyle] = useState({ display: 'none' })
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
      .then((res) => {
        if (res.status != 400) {
          navigate('/sign-in');
          setStatus(true);
          setStyle({
            display: 'block'
          })
        } else {
          res.json().then(res_2 => {
            console.log(res_2.error)
            setStatus(false)
            setErrorMessage(res_2.error)
            setStyle({
              display: 'block'
            })
          })
        }
      })
  }

  return (
    <div className="authForm__container">
      <Message status={status} styles={style} error={errorMessage}/>
      <h2 className="authForm__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="authForm__form">
        <input id="email" name="email" type="email" autoComplete="email" value={formValue.email}
          onChange={handleChange} placeholder="Email" />
        <input id="password" name="password" type="password" autoComplete="new-password" value={formValue.password}
          onChange={handleChange} placeholder="Пароль" />
        <div className="authForm__button-container">
          <button type="submit" className="authForm__link">Зарегистрироваться</button>
        </div>
      </form>
    </div>
  )
}