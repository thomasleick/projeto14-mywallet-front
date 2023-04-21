import useAuth from '../hooks/useAuth';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AuthRoute() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    useEffect(() => {
        if (auth?.accessToken) {
            navigate('/home');
        }
    }, [])


    return (
        <Outlet />
    );
}