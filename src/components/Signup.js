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
                navigate('/signin');
            })
            .catch(err => setErrorMessage(err));
    }

    return (
        <div className="signup">
            <h2 className="signup__title"></h2>
            <form onSubmit={handleSubmit} className="signup__form">
        <label htmlFor="email">
          Email:
        </label>
        <input id="email" name="email" type="email" autoComplete="email" value={formValue.email}
               onChange={handleChange}/>
        <label htmlFor="password">
          Пароль:
        </label>
        <input id="password" name="password" type="password" autoComplete="new-password" value={formValue.password}
               onChange={handleChange}/>
        
        <div className="signup__button-container">
          <button type="submit" className="signup__link">Зарегистрироваться</button>
        </div>
      </form>
        </div>
    )
}