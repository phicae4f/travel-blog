import { Link } from "react-router-dom"
import { Button } from "../ui/Button"
import { CustomInput } from "../ui/CustomInput"

interface AuthComponentProps {
    title: string,
    error?: string | null,
    fieldErrors?: {
        email?: string |null,
        password?: string |null
    }
}

export const AuthComponent = ({error, fieldErrors, title}: AuthComponentProps) => {
    return (
        <div className="auth">
            <h2 className="auth__title">{title}</h2>
            {error && (
                <span className="auth__error">{error}</span>
            )}
            <form className="auth__form">
                <div className="auth__fields">
                    <div className="auth__field">
                        <CustomInput labelText="Логин" type="email" placeholder="Email" id="email" error={fieldErrors?.email}/>
                    </div>
                    <div className="auth__field">
                        <CustomInput labelText="Пароль" type="password" placeholder="Пароль" id="password" error={fieldErrors?.password}/>
                    </div>
                </div>
                <div className="auth__buttons">
                    <Link to="/register">
                        <Button className="btn btn--transparent" type="button" text="Зарегистрироваться"/>
                    </Link>
                    <Button type="submit" text="Войти"/>
                </div>
            </form>
        </div>
    )
}