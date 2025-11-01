import { useState } from "react";
import { Icon } from "../ui/Icon";
import { Link } from "react-router-dom";

export const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="dropdown">
      <button
        className="dropdown__user"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className="dropdown__user-img"
          src="/img/user-example.jpg"
          alt="user-example"
          width={30}
          height={30}
        />
        <span className="dropdown__user-name">Боярская Варвара Михайловна</span>
        <Icon
          className={`dropdown__user-arrow ${isOpen ? "open" : ""}`}
          width={14}
          height={11}
          name="arrow-icon"
        />
      </button>
      <ul className={`dropdown__menu ${isOpen ? "open" : ""}`}>
        <li className="dropdown__item">
          <Link to="/my-profile">Профиль</Link>
        </li>
        <li className="dropdown__item">
          <button className="dropdown__logout" type="button">
            Выйти
          </button>
        </li>
      </ul>
    </div>
  );
};
