import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { CustomInput } from "../ui/CustomInput";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { loginUser, registerUser, clearError } from "../store/slices/authSlice";
import { useEffect } from "react";

interface AuthComponentProps {
  title: string;
  mode: "login" | "register";
}

interface AuthFormData {
  email: string,
  password: string,
  confirmPassword?: string
}

export const AuthComponent = ({
  title,
  mode = "login",
}: AuthComponentProps) => {

  const {register, handleSubmit, formState: {errors}, setError} = useForm<AuthFormData>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {isLoading, error} = useAppSelector((state) => state.auth)

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])


  const onSubmit = async (data: AuthFormData) => {
    dispatch(clearError())
    if(mode === "register" && data.password !== data.confirmPassword) {
      setError("confirmPassword", {message:  "Пароли не совпадают"})
      return;
    }
    const credentials = {email: data.email, password: data.password}
    const result = await dispatch(mode==="login" ? loginUser(credentials) : registerUser(credentials))
    if(result.type.endsWith("/fulfilled")) {
      navigate("/")
    }
  }

  return (
    <div className="auth">
      <h2 className="auth__title">{title}</h2>
      {error && <span className="auth__error">{error}</span>}
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        {
          (mode === "login" ? (
            <>
              <div className="auth__fields">
                <div className="auth__field">
                  <CustomInput
                    labelText="Логин"
                    type="email"
                    placeholder="Email"
                    id="email"
                    {...register("email", {required: "Логин обязателен"})}
                    error={errors?.email?.message}
                  />
                </div>
                <div className="auth__field auth__field--login">
                  <CustomInput
                    labelText="Пароль"
                    type="password"
                    placeholder="Пароль"
                    id="password"
                    {...register("password", {required: "Пароль обязателен", minLength: {value: 6, message: "Минимум 6 символов"}})}
                    error={errors?.password?.message}
                  />
                </div>
              </div>
              <div className="auth__buttons">
                <Link to="/register">
                  <Button
                    className="btn btn--transparent"
                    type="button"
                    text="Зарегистрироваться"
                    disabled={isLoading}
                  />
                </Link>
                <Button type="submit" text={`${isLoading ? "Загрузка...": "Войти"}`} disabled={isLoading} />
              </div>
            </>
          ) : (
            <>
              <div className="auth__fields">
                <div className="auth__field">
                  <CustomInput
                    labelText="Логин"
                    type="email"
                    placeholder="Email"
                    id="email"
                    {...register("email", {required: "Логин обязателен",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Некорректный email"
                      },
                      minLength: {value: 3, message: "Минимум 3 символа"}
                    })}
                    error={errors?.email?.message}
                  />
                </div>
                <div className="auth__field">
                  <CustomInput
                    labelText="Пароль"
                    type="password"
                    placeholder="Пароль"
                    id="password"
                    {...register("password", {required: "Пароль обязателен", minLength: {value: 6, message: "Минимум 6 символов"}})}
                    error={errors?.password?.message}
                  />
                </div>
                <div className="auth__field">
                  <CustomInput
                    labelText="Повторите пароль"
                    type="password"
                    placeholder="Повторите пароль"
                    id="confirmPassword"
                    {...register("confirmPassword", {required: "Повторите пароль"})}
                    error={errors?.confirmPassword?.message}
                  />
                </div>
              </div>
              <div className="auth__buttons">
                  <Button
                    className="btn btn--transparent"
                    type="submit"
                    text={`${isLoading ? "Регистрация...": "Зарегистрироваться"}`}
                    disabled={isLoading}
                  />
              </div>
            </>
          ))
        }
      </form>
    </div>
  );
};
