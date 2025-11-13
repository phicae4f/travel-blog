import { useNavigate } from "react-router-dom";
import { SubmitForm } from "../components/SubmitForm";
import { useAppDispatch } from "../hooks/redux";
import { createPost } from "../store/slices/postsSlice";
import { useState } from "react";
import { Modal } from "../components/Modal";

export const AddPostPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (data: {
    title: string;
    description: string;
    country: string;
    city: string;
    photo: File;
  }) => {
    dispatch(
      createPost({
        title: data.title,
        description: data.description,
        country: data.country,
        city: data.city,
        photo: data.photo
      })
    ).then((result) => {
      if (createPost.fulfilled.match(result)) {
        setIsModalOpen(true)
        setTimeout(() => {
          setIsModalOpen(false)
          navigate("/");
        }, 3000)
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleFormClose = () => {
    setIsModalOpen(false)
  }
  return (
    <>
    <section className="submit-form">
      <div className="container">
        <div className="submit-form__wrapper">
          <SubmitForm
            titleText="Добавление истории о путешествии"
            photoInput
            titleInput
            countryInput
            cityInput
            postTextarea
            onBack={handleBack}
            onSubmitPost={handleSubmit}
          />
        </div>
      </div>
    </section>
    {isModalOpen && <Modal text="Ваш пост успешно добавлен!" onClose={handleFormClose}/>}
    </>
  );
};
