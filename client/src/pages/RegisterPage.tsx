import { AuthComponent } from "../components/AuthComponent"

export const RegisterPage = () => {
    return(
            <div className="register">
                <div className="container">
                    <div className="register__wrapper">
                        <AuthComponent title="Регистрация" mode="register"/>
                    </div>
                </div>
            </div>
        )
}