import '../index.css';
import './styles/EnterPage.css';

import { useState } from 'react';

import EnterPage from './EnterPage.js';

function Login(props){

    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [loginUserPassword, setLoginUserPassword] = useState('');

    function handleLoginUserEmailSubmit(e){
        setLoginUserEmail(e.target.value);
    }

    function handleloginUserPasswordSubmit(e){
        setLoginUserPassword(e.target.value);
    }    

    function handleLoginUserSubmit(e){
        e.preventDefault();
        props.onLoginUser(loginUserEmail, loginUserPassword)
    }
    
    
    return (
            <EnterPage
                formTitle={'Вход'}
                formName='form__login'
                onSubmit={handleLoginUserSubmit}
                buttonText='Войти'
                formSubtitleRoute={null}
                formSubtitleText={null}
                >
                <input value={loginUserEmail} onChange={handleLoginUserEmailSubmit} required className="enter-form__field" placeholder="Email" type="text" minLength="2" maxlenght="40"/>
                <span className="form-error form-error_hidden"></span>
                <input value={loginUserPassword} onChange={handleloginUserPasswordSubmit} required className="enter-form__field" placeholder="Пароль" type="password" minLength="2" maxlenght="200"/>
                <span className="form-error form-error_hidden"></span>    
            </EnterPage>
    )
}

export default Login;