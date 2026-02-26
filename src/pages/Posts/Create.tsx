import { useNavigate } from "react-router-dom";
import useAppContext from "../../Context/useAppContext";
import { useState, type SyntheticEvent } from "react";

export default function Create() {
    const navigate = useNavigate();
    const { token } = useAppContext();

    const [formData, setFormData] = useState<{ title: string, body: string }>({
        title: "",
        body: "",
    })
    const [errors, setErrors] = useState<{ title: string[], body: string[] }>({ title: [], body: [] });

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = event.target.name
        const value = event.target.value
        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch("/api/posts", {
            method: "post",
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
            <h1 className="title">Create a new Post</h1>

            <form onSubmit={handleSubmit} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text" name="title" placeholder="Post Title" value={formData.title} onChange={handleChange} />
                    {errors.title && <p className="error">{errors.title[0]}</p>}
                </div>

                <div>
                    <textarea rows={6} name="body" placeholder="Post Content" value={formData.body} onChange={handleChange} />
                    {errors.body && <p className="error">{errors.body[0]}</p>}
                </div>

                <button className="primary-btn">Create</button>
            </form>
        </>
    )
}
