import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import HomeScreen from '../pages/HomeScreen';
import PostScreen from '../pages/PostScreen';
import PostFormScreen from '../pages/PostFormScreen';
import OwnedScreen from "../pages/OwnedScreen";
import FavoriteScreen from '../pages/FavoriteScreen';


function AdminRoutes({setToken, type}) {
    return (
        <Routes>
            <Route path="/home" element={<HomeScreen setToken={setToken} type = {type}/> }/>
            <Route path = "/post/:idPost" element = {<PostScreen/>}/>
            <Route path="/post/owner" element = {<OwnedScreen type = {type}/>}/>
            <Route path="/post/fav" element = {<FavoriteScreen type = {type}/>}/>

            <Route path="/post/new" element={<PostFormScreen/>}/> 
            <Route path="/post/edit/:idPost" element={<PostFormScreen/>}/>
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    )
}

export default AdminRoutes
