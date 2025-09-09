import React, { useContext } from 'react';
import { AuthProvider } from '../Provider/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({childran}) => {

    const {user} = useContext(AuthProvider)

    if (user) {
        return childran;
    }

    return <Navigate to={'/'}></Navigate>
};

export default PrivateRoute;