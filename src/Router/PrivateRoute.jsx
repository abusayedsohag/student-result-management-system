import React, { useContext } from 'react';
import { AuthProvider } from '../Provider/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user, loader} = useContext(AuthProvider)

    if (loader) {
        return 
    }

    if (user) {
        return children;
    }

    if (!user) {
        return <Navigate to="/login"></Navigate>
    }
};

export default PrivateRoute;