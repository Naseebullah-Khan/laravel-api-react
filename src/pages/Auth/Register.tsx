import { useState, type SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom";
import useAppContext from "../../Context/useAppContext";

export default function Register() {
    const navigate = useNavigate();
    const { setToken } = useAppContext();

    const [formData, setFormData] = useState<{ name: string, email: string, password: string, password_confirmation: string, }>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })
    const [errors, setErrors] = useState<{ name: string[], email: string[], password: string[] }>({ name: [], email: [], password: [] });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name
        const value = event.target.value
        setFormData({ ...formData, [name]: value })
    }

    async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch("/api/register",
            {
                method: "post",
                body: JSON.stringify(formData),
            });

        const data = await response.json();
        if (data.errors) {
            setErrors(data.errors)
        } else {
            localStorage.setItem("token", data.token)
            setToken(data.token);
            navigate("/");
        }
    }

    return (
        <>
            <h1 className="title">Register a new account</h1>

            <form className="w-1/2 mx-auto space-y-6" onSubmit={onSubmit}>
                <div>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
                    {errors.name && <p className="error">{errors.name[0]}</p>}
                </div>

                <div>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                </div>

                <div>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
                    {errors.password && <p className="error">{errors.password[0]}</p>}
                </div>

                <div>
                    <input type="password" name="password_confirmation" placeholder="Confirm Password" onChange={handleChange} value={formData.password_confirmation} required />
                </div>

                <button className="primary-btn">Register</button>
            </form>
        </>
    )
}
