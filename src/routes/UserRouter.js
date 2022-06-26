import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import HomeScreen from '../pages/HomeScreen';
import PostScreen from '../pages/PostScreen';
import FavoriteScreen from '../pages/FavoriteScreen';



function UserRouter({setToken, type}) {
    return (
        <Routes>
            <Route path="/home" element={<HomeScreen setToken={setToken} type = {type}/> }/>
            <Route path = "/post/:idPost" element = {<PostScreen/>}/>
            <Route path="/post/fav" element = {<FavoriteScreen type = {type}/>}/>

            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    )
}

export default UserRouter

