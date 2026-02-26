import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    user: User;
};

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function getPost() {
            const response = await fetch("/api/posts")
            const data = await response.json();

            if (response.ok) {
                setPosts(data);
            }
        }
        getPost()
    }, [])


    return (
        <>
            <h1 className="title">Latest Posts</h1>
            {posts.length > 0 ? posts.map((post) => (
                <div key={post.id} className="mb-4 p-4 border rounded-md border-dashed border-slate-400">
                    <div className="mb-2 flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-2xl">{post.title}</h2>
                            <small className="font-xs text-slate-600">Created by {post.user.name} on {new Date(post.created_at).toLocaleDateString()}</small>
                        </div>
                        <Link to={`/posts/${post.id}`} className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1">Read more</Link>
                    </div>
                    <p>{post.body}</p>
                </div>
            )) : <p>There are no posts</p>}
        </>
    )
}