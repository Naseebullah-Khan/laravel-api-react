import { useNavigate, useParams } from "react-router-dom";
import useAppContext from "../../Context/useAppContext";
import { useEffect, useState, type SyntheticEvent } from "react";

export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, user } = useAppContext();

    const [formData, setFormData] = useState<{ title: string, body: string }>({
        title: "",
        body: "",
    })
    const [errors, setErrors] = useState<{ title: string[], body: string[] }>({ title: [], body: [] });

    useEffect(() => {
        async function getPost() {
            const response = await fetch(`/api/posts/${id}`)
            const data = await response.json();

            if (response.ok) {
                if (user?.id !== data.post.user_id) {
                    navigate("/")
                    return;
                }
                setFormData({ title: data.post.title, body: data.post.body })
            }
        }
        getPost()
    }, [id, navigate, user?.id])

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = event.target.name
        const value = event.target.value
        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch(`/api/posts/${id}`, {
            method: "put",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json();

        if (data.errors) {
            setErrors(data.errors)
        } else {
            navigate("/")
        }
    }

    return (
        <>
            <h1 className="title">Update your Post</h1>

            <form onSubmit={handleSubmit} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" name="title" placeholder="Post Title" value={formData.title} onChange={handleChange} required />
                    {errors.title && <p className="error">{errors.title[0]}</p>}
                </div>

                <div>
                    <textarea rows={6} name="body" placeholder="Post Content" value={formData.body} onChange={handleChange} required />
                    {errors.body && <p className="error">{errors.body[0]}</p>}
                </div>

                <button className="primary-btn">Update</button>
            </form>
        </>
    )
}
