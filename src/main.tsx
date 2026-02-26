import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppProvider } from './Context'

createRoot(document.getElementById('root')!).render(
    <AppProvider>
        <App />
    </AppProvider>
)
