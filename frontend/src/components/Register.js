import '../index.css';
import './styles/EnterPage.css';

import {useState} from 'react';

import EnterPage from './EnterPage.js';

function Register(props){

    const [registerUserEmail, setRegisterUserEmail] = useState('');
    const [registerUserPassword, setRegisterUserPassword] = useState('');

    function handleRegisterUserEmailSubmit(e){
        setRegisterUserEmail(e.target.value);
    }    

    function handleRegisterUserPasswordSubmit(e){
        setRegisterUserPassword(e.target.value);
    }    

    function handleRegisterUserSubmit(e){
        e.preventDefault();
        props.onRegisterUser(registerUserEmail, registerUserPassword);
    }

    return (
        <EnterPage
            formTitle='Регистрация'
            formName='form__register'
            onSubmit={handleRegisterUserSubmit}
            buttonText='Зарегистрироваться'
            formSubtitleRoute='/login'
            formSubtitleText='Уже зарегистрированы? Войти'
        >
        <input value={registerUserEmail} onChange={handleRegisterUserEmailSubmit} required className="enter-form__field" placeholder="Email" type="email" minLength="2" maxlenght="40"/>
        <span className="form-error form-error_hidden"></span>
        <input value={registerUserPassword} onChange={handleRegisterUserPasswordSubmit} required className="enter-form__field" placeholder="Пароль" type="password" minLength="1" maxlenght="200"/>
        <span className="form-error form-error_hidden"></span>    
        </EnterPage>
    )
}

export default Register;