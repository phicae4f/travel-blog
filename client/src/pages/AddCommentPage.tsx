import { useNavigate, useParams } from "react-router-dom"
import { SubmitForm } from "../components/SubmitForm"
import { useAppDispatch } from "../hooks/redux"
import { createComment } from "../store/slices/commentsSlice"
import { Modal } from "../components/Modal"
import { useState } from "react"

export const AddCommentPage = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const handleSubmit = (data: {author_name: string, comment: string}) => {
        if(id) {
            dispatch(createComment({
                postId: Number(id),
                author_name: data.author_name,
                comment: data.comment
            }))
            .then((result) => {
                if(createComment.fulfilled.match(result)) {
                    setShowModal(true)
                    setTimeout(() => {
                        setShowModal(false)
                        navigate(`/post/${id}`)
                    }, 3000)
                }
            })
        }
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        navigate(`/post/${id}`)
    }


    return (
        <>
        <section className="submit-form">
            <div className="container">
                <div className="submit-form__wrapper">
                    <SubmitForm titleText="Добавление отзыва" nameInput reviewTextarea onSubmitComment={handleSubmit} onBack={handleBack}/>
                </div>
            </div>
        </section>
        {showModal && <Modal text="Ваш отзыв успешно создан" onClose = {handleCloseModal}/>}
        </>
        
    )
}