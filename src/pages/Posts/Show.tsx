import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

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

type PostWithUser = {
    post: Post,
    user: User,
}

export default function Show() {
    const { id } = useParams();
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
                </div>
            ) : (
                <p className="title">Post not found!</p>
            )}
        </>
    )
}
