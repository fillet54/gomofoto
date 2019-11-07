import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";
import { useAuth0 } from "../auth0";

const LogoutPage = () => {
    const { loading, logout } = useAuth0();

    useEffect(() => {
        if ( !loading )
            logout({returnTo: window.location.origin})
    }, [loading, logout]);

    return <FontAwesomeIcon icon={faSpinner} spin/>
}

export default LogoutPage