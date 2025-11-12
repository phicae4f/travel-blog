import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { fetchPostById } from "../store/slices/postsSlice";
import { Button } from "../ui/Button";
import { fetchPostComments } from "../store/slices/commentsSlice";

export const PostPage = () => {
  const { id } = useParams();
  const { currentPost, isLoading, error } = useAppSelector(
    (state) => state.posts
  );
  const {
    comments,
    isLoading: isLoadingComments,
    error: errorComments,
  } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(Number(id)));
      dispatch(fetchPostComments(Number(id)));
    }
  }, [id, dispatch]);

  if (!currentPost) {
    return <span>Пост не найден</span>;
  }


  if (isLoading) {
    return (
      <div className="loader">
        <span>Загрузка..</span>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    }).format(date);
  } catch (error) {
    return dateString;
  }
};

  return (
    <section className="post-page">
      <div className="container">
        <div className="post-page__wrapper">
          {error && <span className="post-page__error">{error}</span>}
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
                <h3 className="post__title">
                  {currentPost.title || "Заголовок отсутствует"}
                </h3>
                <p className="post__text">
                  {currentPost.description || "Описание отсутствует"}
                </p>
              </div>
              <ul className="post__reviews">
                {comments.length === 0 ? (
                    <span className="post__no-reviews">Отзывы отсутствуют</span>
                ) : (
                    comments.map((comment) => (
                  <li className="post__reviews-item" key={comment.id}>
                    <span className="post__reviews-name">
                      {comment.author_name}
                    </span>
                    <span className="post__reviews-date">
                      {formatDate(comment.created_at)}
                    </span>
                    <span className="post__reviews-comment">
                      {comment.comment}
                    </span>
                  </li>
                ))
                )}
                
              </ul>
              <div className="post__lower">
                <Button
                  onClick={() => navigate("/")}
                  className="btn btn--transparent"
                  type="button"
                  text="Назад"
                />
                <Button type="button" text="Ваше впечатление об этом месте" onClick={() => navigate(`/post/${id}/add-comment`)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
