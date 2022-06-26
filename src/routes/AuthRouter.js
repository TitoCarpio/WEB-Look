import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import LoginScreen from '../pages/LoginScreen';


const AuthRouter = ({setToken}) => {
    return (
        <Routes>
            <Route path="/login" element={<LoginScreen setToken = {setToken}/> }/>
            <Route path="*" element={<Navigate to="/login"/>} /> 
        </Routes>
    )
}

export default AuthRouter
