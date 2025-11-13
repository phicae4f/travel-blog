import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { CustomInput } from "../ui/CustomInput";
import { CustomTextarea } from "../ui/CustomTextarea";
import { Icon } from "../ui/Icon";
import { useAppSelector } from "../hooks/redux";
import { useRef, useState } from "react";

interface SubmitFormData {
  author_name: string;
  comment: string;
  title: string;
  description: string;
  country: string;
  city: string;
}

interface SubmitFormProps {
  titleText: string;
  nameInput?: boolean;
  reviewTextarea?: boolean;
  titleInput?: boolean;
  countryInput?: boolean;
  cityInput?: boolean;
  postTextarea?: boolean;
  photoInput?: boolean;
  onSubmitComment?: (data: SubmitFormData) => void;
  onSubmitPost?: (data: SubmitFormData & { photo?: File }) => void; 
  onBack?: () => void;
}

export const SubmitForm = ({
  titleText,
  nameInput,
  reviewTextarea,
  titleInput,
  countryInput,
  cityInput,
  postTextarea,
  photoInput,
  onSubmitComment,
  onSubmitPost,
  onBack,
}: SubmitFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitFormData>();
  
  const { error, isLoading } = useAppSelector((state) => state.comments);
  const { isLoading: isPostLoading } = useAppSelector((state) => state.posts); // добавь для постов

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const onSubmit = (data: SubmitFormData) => {
    if(onSubmitComment) {
        onSubmitComment(data)
    }
    if(onSubmitPost) {
      onSubmitPost({
        ...data,
        photo: selectedPhoto || undefined
      })
    }
  }

  const isLoadingState = isLoading || isPostLoading

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__title">{titleText}</h2>
      {error && <span className="form__error">{error}</span>}
      <div className="form__fields">
        {photoInput && (
          <div className="form__upload-wrapper">
            {photoPreview ? (
              <div className="form__photo-preview">
                <img src={photoPreview} alt="Preview" className="form__preview-image" />
                <button 
                  type="button" 
                  className="form__change-photo"
                  onClick={handleImageClick}
                >
                  Изменить фото
                </button>
              </div>
            ) : (
              <button 
                className="form__upload" 
                type="button"
                onClick={handleImageClick}
              >
                <Icon name="icon-upload" width={14} height={14}/>
                <span className="form__upload-text">Загрузите ваше фото</span>
              </button>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="visually-hidden" 
              accept="image/*"
            />
          </div>
        )}
        {nameInput && (
          <CustomInput
            labelText="Ваше имя"
            placeholder="Ваше имя"
            id="comment-username"
            type="text"
            {...register("author_name", { required: "Имя обязательно" })}
            error={errors?.author_name?.message}
          />
        )}
        {reviewTextarea && (
          <CustomTextarea
            placeholder="Добавьте текст отзыва"
            {...register("comment", {
              required: "Описание отзыва обязательно",
            })}
            error={errors?.comment?.message}
          />
        )}
        {titleInput && (
          <CustomInput
            labelText="Заголовок"
            placeholder="Заголовок"
            id="post-title"
            type="text"
            {...register("title", {
              required: "Заголовок обязателен"
            })}
            error={errors?.title?.message}
          />
        )}
        <div className="form__small-fields">
          {countryInput && (
            <CustomInput
              labelText="Страна"
              placeholder="Страна"
              id="comment-country"
              type="text"
              {...register("country", {
                required: "Страна обязательна"
              })}
              error={errors?.country?.message}
            />
          )}
          {cityInput && (
            <CustomInput
              labelText="Город"
              placeholder="Город"
              id="comment-city"
              type="text"
              {...register("city", {
                required: "Город обязателен"
              })}
              error={errors?.city?.message}
            />
          )}
        </div>
        {postTextarea && (
          <CustomTextarea 
            placeholder="Добавьте описание вашей истории" 
            {...register("description", {
              required: "Описание обязательно"
            })}
            error={errors?.description?.message}
          />
        )}
      </div>
      <div className="form__buttons">
        <Button className="btn btn--transparent" type="button" text="Назад" onClick={onBack}/>
        <Button 
          type="submit" 
          text={isLoadingState ? "Сохранение.." : "Сохранить"}
          disabled={isLoadingState}
        />
      </div>
    </form>
  );
};