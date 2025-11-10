import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { useEffect } from "react"
import { fetchPostById } from "../store/slices/postsSlice"

export const PostPage = () => {
    const {id} = useParams()
    const {currentPost, isLoading, error} =useAppSelector(state => state.posts)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(id) {
            dispatch(fetchPostById(Number(id)))
        }
    }, [id, dispatch])

    if(!currentPost) {
        return (
            <span>Пост не найден</span>
        )
    }

    if(isLoading) {
        return (
            <div className="loader">
                <span>Загрузка..</span>
            </div>
        )
    }

    return (
        <section className="post-page">
            <div className="container">
                <div className="post-page__wrapper">
                {error && (
                        <span className="post-page__error">{error}</span>
                )}
                <div className="post post--xl">
                  <img
                    className="post__img"
                    width={370}
                    height={288}
                    src="/img/post.jpg"
                    alt="Фото поста"
                    loading="lazy"
                  />
                  <div className="post__info">
                    <div className="post__upper">
                      <h3 className="post__title">{currentPost.title}</h3>
                      <p className="post__text">{currentPost.excerpt}</p>
                    </div>
                    <div className="post__lower">
                      <span className="post__place">{currentPost.country ? (currentPost.country, currentPost.city) : (currentPost.city)}</span>
                    </div>
                  </div>
                </div>
            </div>
            </div>
        </section>
    )
}