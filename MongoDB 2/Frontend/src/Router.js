import {Route, Routes} from 'react-router-dom';
import './index.css'
import Dashboard from './Dashboard';
import Users from './Users';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
        </Routes>
    )
}
export function RouterLogin() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}