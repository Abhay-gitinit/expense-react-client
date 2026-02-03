import axios from "axios";
import { useEffect } from "react";
import { serverEndpoint } from "../config/appConfig";

function Logout({setUser}) {
    const handleLogout = async () => {
        try {
            awaut.axios.post(`{$serverEndpoint}/auth/logout`,{},{ withCredentials: true});
            document.cookie = `jwtToken=; expires=Thu, 01 Jan 1970 00:00:00; path=/;`;
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleLogout();
    }, []);
}

export default Logout;