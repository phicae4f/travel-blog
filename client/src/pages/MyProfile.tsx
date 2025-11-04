import { Icon } from "../ui/Icon";

export const MyProfile = () => {
  return (
    <div className="profile">
      <div className="container">
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
            <h2 className="profile__name">Новый Пользователь</h2>
            <div className="profile__info-block">
              <span className="profile__info-heading">Город:</span>
              <p className="profile__info-text">Вышний Волочёк</p>
            </div>
            <div className="profile__info-block">
              <span className="profile__info-heading">О себе:</span>
              <p className="profile__info-text">
                Я обожаю путешествовать. Мне нравится открывать для себя новые
                места, знакомиться с разными культурами и традициями. Я всегда
                готова отправиться в путь, даже если это означает покинуть зону
                комфорта. В дороге я встречаю новых людей, учусь новому и
                наслаждаюсь красотами природы. Путешествия дают мне возможность
                расширить свой кругозор и узнать больше о мире вокруг меня. Я
                уверена, что каждый новый опыт делает меня сильнее и мудрее.
              </p>
            </div>
          </div>
          <button className="profile__edit-btn" type="button">
            <Icon name="edit-icon" width={32} height={32} />
          </button>
        </div>
      </div>
    </div>
  );
};
