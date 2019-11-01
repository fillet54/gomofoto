import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FeedPage from '../pages/Feed';
import LoginPage from '../pages/Login';
import LogoutPage from '../pages/Logout';
import UploadPage from '../pages/Upload';
import ProtectedRoute from './ProtectedRoute'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={LoginPage} />
                <Route path='/logout' component={LogoutPage} />
                <ProtectedRoute path='/upload' component={UploadPage} />
                <ProtectedRoute path='/' component={FeedPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;