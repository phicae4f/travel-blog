import { useNavigate } from "react-router-dom"
import { SubmitForm } from "../components/SubmitForm"

export const AddPostPage = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }
    return (
        <section className="submit-form">
                    <div className="container">
                        <div className="submit-form__wrapper">
                            <SubmitForm titleText="Добавление истории о путешествии" titleInput countryInput cityInput postTextarea onBack={handleBack}/>
                        </div>
                    </div>
        </section>
    )
}