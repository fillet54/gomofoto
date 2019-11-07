import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FeedPage from '../pages/Feed';
import LoginPage, { AuthLanding } from '../pages/Login';
import LogoutPage from '../pages/Logout';
import UploadPage from '../pages/Upload';
import { LayoutProtectedRoute as ProtectedRoute } from './ProtectedRoute'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={LoginPage} />
                <Route path='/logout' component={LogoutPage} />
                <Route path="/auth"   component={AuthLanding} />
                <ProtectedRoute path='/upload' component={UploadPage} />
                <ProtectedRoute path='/' component={FeedPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Router;