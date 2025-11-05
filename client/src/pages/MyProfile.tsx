import React, { useState } from "react";
import { Icon } from "../ui/Icon";
import { CustomInput } from "../ui/CustomInput";
import { CustomTextarea } from "../ui/CustomTextarea";
import { Button } from "../ui/Button";

interface ProfileFormData {
  username: string;
  city: string;
  bio: string;
  newPassword: string;
  confirmPassword: string;
}

export const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    username: "Новый Пользователь",
    city: "Вышний Волочёк",
    bio: "Я обожаю путешествовать. Мне нравится открывать для себя новые места, знакомиться с разными культурами и традициями. Я всегда готова отправиться в путь, даже если это означает покинуть зону комфорта. В дороге я встречаю новых людей, учусь новому и наслаждаюсь красотами природы. Путешествия дают мне возможность расширить свой кругозор и узнать больше о мире вокруг меня. Я уверена, что каждый новый опыт делает меня сильнее и мудрее.",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCloseEdit = () => {
    setIsEditing(false);
    setFormData({
      username: "Новый Пользователь",
      city: "Вышний Волочёк",
      bio: "Я обожаю путешествовать. Мне нравится открывать для себя новые места, знакомиться с разными культурами и традициями. Я всегда готова отправиться в путь, даже если это означает покинуть зону комфорта. В дороге я встречаю новых людей, учусь новому и наслаждаюсь красотами природы. Путешествия дают мне возможность расширить свой кругозор и узнать больше о мире вокруг меня. Я уверена, что каждый новый опыт делает меня сильнее и мудрее.",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    setIsEditing(false);
  }

  const handleInputChange =
    (field: keyof ProfileFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <div className="profile">
      <div className="container">
        {!isEditing ? (
          <div className="profile__wrapper">
            <div className="profile__img-wrapper">
              <img
                className="profile__img"
                src="/img/new-user.jpg"
                alt="Фото профиля"
                width={240}
                height={240}
              />
              <div className="profile__edit-img">
                <Icon name="photo-icon" width={32} height={32} />
                <span className="profile__edit-text">Изменить фото</span>
              </div>
            </div>
            <div className="profile__info">
              <h2 className="profile__name">{formData.username}</h2>
              <div className="profile__info-block">
                <span className="profile__info-heading">Город:</span>
                <p className="profile__info-text">{formData.city}</p>
              </div>
              <div className="profile__info-block">
                <span className="profile__info-heading">О себе:</span>
                <p className="profile__info-text">{formData.bio}</p>
              </div>
            </div>
            <button
              className={`profile__edit-btn ${isEditing ? "active" : ""}`}
              type="button"
              onClick={handleEdit}
            >
              <Icon name="edit-icon" width={32} height={32} />
            </button>
          </div>
        ) : (
          <div className="profile__wrapper">
            <div className="profile__img-wrapper">
              <img
                className="profile__img"
                src="/img/new-user.jpg"
                alt="Фото профиля"
                width={240}
                height={240}
              />
              <div className="profile__edit-img">
                <Icon name="photo-icon" width={32} height={32} />
                <span className="profile__edit-text">Изменить фото</span>
              </div>
            </div>
            <form className="profile__info" onSubmit={handleSubmit}>
              <div className="profile__info-block">
                <CustomInput
                  onChange={handleInputChange("username")}
                  labelText="ФИО"
                  placeholder="ФИО"
                  id="username"
                  value={formData.username}
                  type="text"
                />
              </div>
              <div className="profile__info-block">
                <CustomInput
                  onChange={handleInputChange("city")}
                  labelText="Город"
                  placeholder="Город"
                  id="city"
                  value={formData.city}
                  type="text"
                />
              </div>
              <div className="profile__info-block">
                <span className="profile__info-heading">О себе:</span>
                <CustomTextarea
                  onChange={handleInputChange("bio")}
                  placeholder="О себе..."
                  value={formData.bio}
                />
              </div>
              <div className="profile__change-password">
                <h3 className="profile__change-password-title">Смена пароля</h3>
                <div className="profile__change-password-fields">
                  <div className="profile__change-password-field">
                    <CustomInput
                      onChange={handleInputChange("newPassword")}
                      labelText="Новый пароль"
                      placeholder="Новый пароль"
                      id="new-password"
                      value={formData.newPassword}
                      type="password"
                    />
                  </div>
                  <div className="profile__change-password-field">
                    <CustomInput
                      onChange={handleInputChange("confirmPassword")}
                      labelText="Повторите пароль"
                      placeholder="Повторите пароль"
                      id="confirm-new-password"
                      value={formData.confirmPassword}
                      type="password"
                    />
                  </div>
                </div>
                <div className="profile__change-password-buttons">
                  <Button
                    className="btn btn--transparent"
                    type="button"
                    text="Назад"
                    onClick={handleCloseEdit}
                  />{" "}
                  {/* //disabled */}
                  <Button type="submit" text="Сохранить" /> {/* //disabled */}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
