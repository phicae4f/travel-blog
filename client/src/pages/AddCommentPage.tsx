import { useNavigate, useParams } from "react-router-dom"
import { SubmitForm } from "../components/SubmitForm"
import { useAppDispatch } from "../hooks/redux"
import { createComment } from "../store/slices/commentsSlice"

export const AddCommentPage = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit = (data: {author_name: string, comment: string}) => {
        if(id) {
            dispatch(createComment({
                postId: Number(id),
                author_name: data.author_name,
                comment: data.comment
            }))
            .then((result) => {
                if(createComment.fulfilled.match(result)) {
                    navigate(`/post/${id}`)
                }
            })
        }
    }

    const handleBack = () => {
        navigate(-1)
    }
    return (
        <section className="submit-form">
            <div className="container">
                <div className="submit-form__wrapper">
                    <SubmitForm titleText="Добавление отзыва" nameInput reviewTextarea onSubmitComment={handleSubmit} onBack={handleBack}/>
                </div>
            </div>
        </section>
    )
}