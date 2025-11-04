import { Icon } from "../ui/Icon";
import { Link } from "react-router-dom";
import { DropDown } from "./DropDown";
import { useAppSelector } from "../hooks/redux";

interface HeaderProps {
  isShort?: boolean
}

export const Header = ({isShort = false}: HeaderProps) => {

  const {token} = useAppSelector((state) => state.auth)

  const isAuth = Boolean(token)


  return (
    <header className={`header ${isShort ? "header--short": ""}`}>
        <div className="container">
            <div className="header__wrapper">
                <div className="header__block-upper">
                  <Link to="/">
                    <div className="header__block-left">
                      <Icon className="header__icon" name="header-icon" width={41} height={30} />
                      <span className="header__name">Travel</span>
                  </div>
                  </Link>
                  <div className="header__block-right">
                    {isAuth ? (
                      <DropDown />
                    ) : (
                      <Link to="/login">
                        <button className="header__login" type="button">Войти</button>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="header__block-lower">
                  <h2 className="header__title">{isAuth ? "Истории ваших путешествий": "Там, где мир начинается с путешествий"}</h2>
                </div>
            </div>
        </div>
    </header>
  )
};
