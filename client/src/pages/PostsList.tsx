import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { fetchAllPosts } from "../store/slices/postsSlice"

export const PostsList = () => {
    const {posts, isLoading, error} = useAppSelector((state) => state.posts)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [dispatch])


    return (
        <div className="posts">
            <div className="container">
                <div className="posts__wrapper">
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                <img src="/img/post.jpg" alt="Фото поста" loading="lazy"/>
                                <span>{post.title}</span>
                            </li>
                    ))}
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}