import { useEffect, useState, type SyntheticEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import useAppContext from "../../Context/useAppContext";

type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
};

type Post = {
    id: number;
    user_id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
};

export type PostWithUser = {
    post: Post,
    user: User,
}

export default function Show() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, token } = useAppContext()
    const [post, setPost] = useState<PostWithUser>();

    useEffect(() => {
        async function getPost() {
            const response = await fetch(`/api/posts/${id}`)
            const data = await response.json();

            if (response.ok) {
                setPost(data);
            }
        }
        getPost()
    }, [id])

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        if (user?.id === post?.post.user_id) {
            const response = await fetch(`/api/posts/${id}`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            if (response.ok) {
                navigate("/")
            }
        }
    }

    return (
        <>
            {post ? (
                <div key={post.post.id} className="mt-4 p-4 border rounded-md border-dashed border-slate-400">
                    <div className="mb-2 flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-2xl">{post.post.title}</h2>
                            <small className="font-xs text-slate-600">Created by {post.user.name} on {new Date(post.post.created_at).toLocaleDateString()}</small>
                        </div>
                    </div>
                    <p>{post.post.body}</p>
                    {user?.id === post.post.user_id &&
                        <div className="flex items-center justify-end gap-4">
                            <Link to={`/posts/update/${post.post.id}`} className="bg-green-500 text-white text-sm rounded-lg px-3 py-1">Update</Link>
                            <form onSubmit={handleSubmit}>
                                <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">Delete</button>
                            </form>
                        </div>
                    }
                </div>
            ) : (
                <p className="title">Post not found!</p>
            )}
        </>
    )
}
