import { useNavigate, useLocation } from "react-router-dom";
import * as mestoAuth from '../utils/MestoAuth'
import { useState, useEffect } from "react";

export function Signin({ handleLogin }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            mestoAuth.getContent(jwt)
                .then(user => {
                    console.log('location', location);
                    const url = location.state?.backUrl || '/content';
                    handleLogin(user)
                    navigate(url)
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        tokenCheck()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formValue.password || !formValue.email) {
            setErrorMessage('Both fields are required');
            return;
        }

        const { email, password } = formValue;

        mestoAuth.authorize(email, password)
            .then(data => {
                if (data.jwt) {
                    localStorage.setItem('jwt', data.jwt);
                    handleLogin(data.user);
                    const url = location.state?.backUrl || '/content';
                    navigate(url);
                    console.log(email, password);
                }
            })
            .catch(err => {
                console.log(err);
                setErrorMessage(err);
            });
    }

    return (
        <div onSubmit={handleSubmit} className="signin">
            <h2 className="signin__title">Вход</h2>
            <form className="signin__form">
                <input id="email" required name="email" type="email" autoComplete="login" value={formValue.email}
                    onChange={handleChange} />
                <input id="password" required name="password" type="password" autoComplete="current-password"
                    value={formValue.password} onChange={handleChange} />
                <div className="login__button-container">
                    <button type="submit" className="login__link">Войти</button>
                </div>
            </form>
        </div>
    )
}