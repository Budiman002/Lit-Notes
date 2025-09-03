import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthPage(){
    const[isLogin, setIsLogin] = useState(true);
    const switchToLogin = () => setIsLogin(true);
    const switchToRegister = () => setIsLogin(false);

    return(
        <div className="auth-page">
        <div className="auth-container">
        <div className="auth-card card">
            {isLogin ? (
                <LoginForm onSwitchToRegister={switchToRegister}/>
            ) : (
                <RegisterForm onSwitchToLogin={switchToLogin}/>
            )}
        </div>
        </div>
        </div>
    );
}

export default AuthPage;