import { AuthComponent } from "../components/AuthComponent"

export const RegisterPage = () => {
    return(
            <div className="register">
                <div className="container">
                    <div className="register__wrapper">
                        <AuthComponent title="Регистрация" fieldErrors={{email: "Аккаунт с данным email уже существует"}}/>
                    </div>
                </div>
            </div>
        )
}