import { useEffect, useRef, useState } from "react";
import { Icon } from "../ui/Icon";
import { CustomInput } from "../ui/CustomInput";
import { CustomTextarea } from "../ui/CustomTextarea";
import { Button } from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchUserProfile, updateUserProfile } from "../store/slices/userSlice";
import { useForm } from "react-hook-form";

interface ProfileFormData {
  full_name: string;
  city: string;
  bio: string;
  newPassword: string;
  confirmPassword: string;
}

export const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {full_name, city, bio, photo, error, isLoading } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const {register, handleSubmit, formState: {errors}, reset, watch} = useForm<ProfileFormData>({
    defaultValues: {
      full_name: full_name || "",
      city: city || "",
      bio: bio || "",
      newPassword: "",
      confirmPassword: ""
    }
  })
  useEffect(() => {
    reset({
      full_name: full_name || "",
      city: city || "",
      bio: bio || "",
      newPassword: "",
      confirmPassword: ""
    })
  }, [full_name, city, bio, reset])

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if(file) {
      if(!file.type.startsWith("image/")) {
        alert("Выберите изображение")
        return;
      }
      if(file.size > 5 * 1024 * 1024) {
        alert("Размер файла слишком большой")
        return;
      }
      setSelectedPhoto(file)
      const objectUrl = URL.createObjectURL(file)
      setPhotoPreview(objectUrl)
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    reset({
      full_name: full_name || "",
      city: city || "",
      bio: bio || "",
      newPassword: "",
      confirmPassword: ""
    })
  };

  const onSubmit = async (data: ProfileFormData) => {
    const updatedData: any = {}
    if(data.full_name !== undefined) updatedData.full_name = data.full_name;
    if (data.city !== undefined) updatedData.city = data.city;
    if (data.bio !== undefined) updatedData.bio = data.bio;

    if(selectedPhoto) {
      updatedData.photo = selectedPhoto
    }

    if (data.newPassword && data.newPassword === data.confirmPassword) {
      updatedData.password = data.newPassword;
    }
     console.log("Photo path from server:", photo);
      console.log("Trying to load from:", `${import.meta.env.VITE_API_URL}${photo}`);

    const result = await dispatch(updateUserProfile(updatedData));
    
    if (updateUserProfile.fulfilled.match(result)) {
      setIsEditing(false);
      setSelectedPhoto(null)
      setPhotoPreview("")

       dispatch(fetchUserProfile());
    }
  }

  const getPhotoUrl = (photoPath: string) => {
  if (!photoPath) return "/img/new-user.jpg";
  
  if (photoPath.startsWith("http") || photoPath.startsWith("blob:")) {
    return photoPath;
  }
  
  // Если это относительный путь, добавляем базовый URL
  if (photoPath.startsWith("/")) {
    return `${import.meta.env.VITE_API_URL}${photoPath}`;
  }
  
  return photoPath;
};

  const currentPhoto = photoPreview || getPhotoUrl(photo || "") || "/img/new-user.jpg"

  

  return (
    <div className="profile">
      <div className="container">
        {!isEditing ? (
          <div className="profile__wrapper">
            <div className="profile__img-wrapper">
              <img
                className="profile__img"
                src={getPhotoUrl(photo || "")}
                alt="Фото профиля"
                width={240}
                height={240}
                onError={(e) => {
    // Fallback если изображение не загружается
    e.currentTarget.src = "/img/new-user.jpg";
  }}
              />
              <div className="profile__edit-img" onClick={handleImageClick}>
                <Icon name="photo-icon" width={32} height={32} />
                <span className="profile__edit-text">Изменить фото</span>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="visually-hidden"/>
            </div>
            <div className="profile__info">
              <h2 className="profile__name">{full_name || "Новый пользователь"}</h2>
              <div className="profile__info-block">
                <span className="profile__info-heading">Город:</span>
                <p className="profile__info-text">{city || "Не указан"}</p>
              </div>
              <div className="profile__info-block">
                <span className="profile__info-heading">О себе:</span>
                <p className="profile__info-text">{bio || "Информация о себе не заполнена"}</p>
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
                src={currentPhoto}
                alt="Фото профиля"
                width={240}
                height={240}
              />
              <div className="profile__edit-img" onClick={handleImageClick}>
                <Icon name="photo-icon" width={32} height={32} />
                <span className="profile__edit-text">Изменить фото</span>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="visually-hidden"/>
            </div>
            <form className="profile__info" onSubmit={handleSubmit(onSubmit)}>
              {error && <div className="auth__error">{error}</div>}
              <div className="profile__info-block">
                <CustomInput
                  labelText="ФИО"
                  placeholder="ФИО"
                  id="username"
                  type="text"
                  error={errors.full_name?.message}
                  {...register("full_name", {
                    required: "ФИО обязательно",
                    minLength: {
                      value: 2,
                      message: "Минимум 2 символа"
                    }
                  })}
                />
              </div>
              <div className="profile__info-block">
                <CustomInput
                  labelText="Город"
                  placeholder="Город"
                  id="city"
                  type="text"
                  error={errors.city?.message}
                  {...register("city")}
                />
              </div>
              <div className="profile__info-block">
                <span className="profile__info-heading">О себе:</span>
                <CustomTextarea
                  placeholder="О себе..."
                  error={errors.bio?.message}
                  {...register("bio", {
                    maxLength: {
                      value: 600,
                      message: "Максимум 600 символов"
                    }
                  })}
                />
              </div>
              <div className="profile__change-password">
                <h3 className="profile__change-password-title">Смена пароля</h3>
                <div className="profile__change-password-fields">
                  <div className="profile__change-password-field">
                    <CustomInput
                      labelText="Новый пароль"
                      placeholder="Новый пароль"
                      id="new-password"
                      type="password"
                      error={errors.newPassword?.message}
                      {...register("newPassword", {
                        minLength: {
                          value: 6,
                          message: "Минимум 6 символов"
                        }
                      })}
                    />
                  </div>
                  <div className="profile__change-password-field">
                    <CustomInput
                      labelText="Повторите пароль"
                      placeholder="Повторите пароль"
                      id="confirm-new-password"
                      type="password"
                      error={errors.confirmPassword?.message}
                      {...register("confirmPassword", {
                        validate: (value) => {
                          const newPassword = watch("newPassword");
                          return value === newPassword || "Пароли не совпадают";
                        }
                      })}
                    />
                  </div>
                </div>
                <div className="profile__change-password-buttons">
                  <Button
                    className="btn btn--transparent"
                    type="button"
                    text="Назад"
                    onClick={handleCloseEdit}
                    disabled={isLoading}
                  />{" "}
                  <Button type="submit" text={isLoading ? "Сохранение..." : "Сохранить"} 
                    disabled={isLoading}/> 
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
