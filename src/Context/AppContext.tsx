import { createContext } from 'react';

// Define the shape of the context value
interface AppContextValue {
    token: string | null
    setToken: React.Dispatch<React.SetStateAction<string | null>>
    user: { id: number, name: string, email: string, email_verified_at: null, created_at: string, updated_at: string } | null
}

// Create and export the context with a default value
export const AppContext = createContext<AppContextValue | undefined>(undefined);