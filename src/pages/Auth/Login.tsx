import { useNavigate } from "react-router-dom";
import useAppContext from "../../Context/useAppContext";
import { useState, type SyntheticEvent } from "react";

export default function Login() {
    const navigate = useNavigate();
    const { setToken } = useAppContext();

    const [formData, setFormData] = useState<{ email: string, password: string }>({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState<{ email: string[], password: string[] }>({ email: [], password: [] });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name
        const value = event.target.value
        setFormData({ ...formData, [name]: value })
    }

    async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch("/api/login",
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
            <h1 className="title">Login to your account</h1>

            <form className="w-1/2 mx-auto space-y-6" onSubmit={onSubmit}>

                <div>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                </div>

                <div>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
                    {errors.password && <p className="error">{errors.password[0]}</p>}
                </div>

                <button className="primary-btn">Login</button>
            </form>
        </>
    )
}
