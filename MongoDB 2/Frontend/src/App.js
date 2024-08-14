import { createContext, useEffect, useState } from 'react';
import './App.css';
import { RouterLogin, Router } from './Router';
import Loader from './Loader';
import Logout from './Auth/Logout';
import {jwtDecode} from 'jwt-decode';

export const GeneralContext = createContext();

function App() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);

            const now = new Date();
            const exp = new Date(user.exp * 1000);

            if (exp > now) {
                setUser(user);
            } else {
                localStorage.removeItem('token');
                setUser();
            }
        } else {
            setUser();
        }
    }, []);

    return (
        <GeneralContext.Provider value={{ setLoading, user, setUser }}>
            {
                user !== null &&
                <div className="App">
                    {user && <Logout />}
                    {user ? <Router /> : <RouterLogin />}
                </div>
            }
            {loading && <Loader />}
        </GeneralContext.Provider >
    );
}

export default App;