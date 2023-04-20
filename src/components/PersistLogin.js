import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import React from 'react';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    const persist = true
    
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


/*     useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading]) */

    return (
        <>
            {!persist
                ? <Outlet />
            :   isLoading
                    ?<p>Loading...</p>
                    :<Outlet />
            }
        </>
    )
}

export default PersistLogin