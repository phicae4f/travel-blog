import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { CustomInput } from "../ui/CustomInput";
import { CustomTextarea } from "../ui/CustomTextarea";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

interface SubmitFormData {
  author_name: string;
  comment: string;
}

interface SubmitFormProps {
  titleText: string;
  nameInput?: boolean;
  reviewTextarea?: boolean;
  titleInput?: boolean;
  countryInput?: boolean;
  cityInput?: boolean;
  postTextarea?: boolean;
  onSubmitComment?: (data: SubmitFormData) => void;
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
  onSubmitComment,
  onBack,
}: SubmitFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitFormData>();
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.comments);

  const onSubmit = (data: SubmitFormData) => {
    if(onSubmitComment) {
        onSubmitComment(data)
    }
  }

  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form__title">{titleText}</h2>
      {error && <span className="form__error">{error}</span>}
      <div className="form__fields">
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
          />
        )}
        <div className="form__small-fields">
          {countryInput && (
            <CustomInput
              labelText="Страна"
              placeholder="Страна"
              id="comment-country"
              type="text"
            />
          )}
          {cityInput && (
            <CustomInput
              labelText="Город"
              placeholder="Город"
              id="comment-city"
              type="text"
            />
          )}
        </div>
        {postTextarea && (
          <CustomTextarea placeholder="Добавьте описание вашей истории " />
        )}
      </div>
      <div className="form__buttons">
        <Button className="btn btn--transparent" type="button" text="Назад" onClick={onBack}/>
        <Button type="submit" text={isLoading ? "Сохранение.." : "Сохранить"}/>
      </div>
    </form>
  );
};
