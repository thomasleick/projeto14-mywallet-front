import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import React from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import LoadingHomePage from "./LoadingHome";
import LoadingPage from "./LoadingPage";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    const persist = true
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));

    const jwt = Cookies.get('jwt');

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            }
            catch (err) {
                console.log(err)
            }
            finally {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? jwt ? <LoadingHomePage /> : <LoadingPage />
                    : <Outlet />
            }
        </>
    )
}
export default PersistLogin