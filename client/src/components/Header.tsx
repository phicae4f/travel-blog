import { useState } from "react";
import { Icon } from "../ui/Icon";

export const Header = () => {

  const [isAuth, setIsAuth] = useState(false)


  return (
    <header className="header">
        <div className="container">
            <div className="header__wrapper">
                <div className="header__block-upper">
                  <div className="header__block-left">
                    <Icon className="header__icon" name="header-icon" width={41} height={30} />
                    <span className="header__name">Travel</span>
                  </div>
                  <div className="header__block-right">
                    {isAuth ? (
                      <span className="header__login">Dropdown</span>
                    ) : (
                      <button className="header__login" type="button">Войти</button>
                    )}
                  </div>
                </div>
                <div className="header__block-lower">
                  
                </div>
            </div>
        </div>
    </header>
  )
};
