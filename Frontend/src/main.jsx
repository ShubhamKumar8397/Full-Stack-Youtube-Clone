import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from "react-redux"
import './index.css'
import App from './App.jsx'
import store from './Redux/ReduxStore/store.js'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>


)
