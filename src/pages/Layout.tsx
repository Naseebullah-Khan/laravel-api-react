import { Link, Outlet, useNavigate } from "react-router-dom";
import useAppContext from "../Context/useAppContext";
import type { SyntheticEvent } from "react";

export default function Layout() {
    const navigate = useNavigate();
    const { user, token, setUser, setToken } = useAppContext();

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch("/api/logout", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.ok) {
            setUser(null)
            setToken(null)
            localStorage.removeItem("token")
            navigate("/")
        }
    }

    return (
        <>
            <header>
                <nav>
                    <Link to="/" className="nav-link">Home</Link>
                    {user && user.name ? (
                        <div className="space-x-4 flex items-center">
                            <p className="text-slate-400 text-xs">Welcome back {user.name}</p>
                            <Link to="/create" className="nav-link">New Post</Link>
                            <form onSubmit={handleSubmit}>
                                <button className="nav-link">Logout</button>
                            </form>
                        </div>
                    ) :
                        <div className="space-x-4">
                            <Link to="/register" className="nav-link">Register</Link>
                            <Link to="/login" className="nav-link">Login</Link>
                        </div>
                    }
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}