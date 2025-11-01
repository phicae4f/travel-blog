
import { AuthComponent } from "../components/AuthComponent"

export const LoginPage = () => {
    return(
        <div className="login">
            <div className="container">
                <div className="login__wrapper">
                    <AuthComponent title="Вход в профиль" error="Неправильный логин или пароль"/>
                </div>
            </div>
        </div>
    )
}