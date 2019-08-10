import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import SiteContext from '../context/site-context'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";

const LogoutPage = () => {
    const {logout} = useContext(SiteContext)
    const [inProgress, setInProgress] = useState(true)

    useEffect(function() {
        logout()
        .finally(function (){
            setInProgress(false)
        })
    }, []);

    return (inProgress ? 
        <FontAwesomeIcon icon={faSpinner} spin/> :
        <Redirect to={{pathname: '/login'}} />
    );
}

export default LogoutPage