import { useEffect, useRef, useState } from "react";
import { Icon } from "../ui/Icon";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout } from "../store/slices/authSlice";

export const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {full_name} = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(dropdownRef.current && ! dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    setIsOpen(false)
    navigate("/")
  }

  const handleItemClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown__user"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className="dropdown__user-img"
          src="/img/new-user.jpg"
          alt="user-example"
          width={30}
          height={30}
        />
        <span className="dropdown__user-name">{full_name || "Новый Пользователь"}</span>
        <Icon
          className={`dropdown__user-arrow ${isOpen ? "open" : ""}`}
          width={14}
          height={11}
          name="arrow-icon"
        />
      </button>
      <ul className={`dropdown__menu ${isOpen ? "open" : ""}`}>
        <li className="dropdown__item">
          <Link to="/my-profile" onClick={handleItemClick}>Профиль</Link>
        </li>
        <li className="dropdown__item">
          <button className="dropdown__logout" type="button" onClick={handleLogout}>
            Выйти
          </button>
        </li>
      </ul>
    </div>
  );
};
