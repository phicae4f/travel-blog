import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAllPosts } from "../store/slices/postsSlice";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export const PostsList = () => {
  const { posts, isLoading, error } = useAppSelector((state) => state.posts);
  const {token} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  if(isLoading) {
    return (
        <div className="loader">
            <span>Загрузка..</span>
        </div>
    )
  }

  return (
    <section className="posts">
      <div className="container">
        <div className="posts__wrapper">
          <ul className="posts__list">
            {error && (
                <span className="posts__error">{error}</span>
            )}
            {posts.map((post) => (
                <li className="posts__item" key={post.id}>
                <Link to="/" className="post">
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
                      <h3 className="post__title">{post.title}</h3>
                      <p className="post__text">{post.excerpt}</p>
                    </div>
                    <div className="post__lower">
                      <span className="post__place">{post.country ? (post.country, post.city) : (post.city)}</span>
                      <Link to="/" className="post__link">Подробнее</Link>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {token && (
              <Button type="button" text="Добавить мое путешествие"/>
          )}
        </div>
      </div>
    </section>
  );
};
