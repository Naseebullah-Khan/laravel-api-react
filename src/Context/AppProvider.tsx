import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";

interface AppProviderProps {
    children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<{ id: number, name: string, email: string, email_verified_at: null, created_at: string, updated_at: string } | null>(null);


    useEffect(() => {
        if (token) {
            async function getUser() {
                const response = await fetch("/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                }
            }
            getUser();
        }
    }, [token])

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AppContext.Provider>
    )
}
