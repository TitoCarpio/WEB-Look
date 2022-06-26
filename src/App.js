import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AdminRouter from "./routes/AdminRouter";
import UserRouter from "./routes/UserRouter";
import AuthRouter from "./routes/AuthRouter";
import jwt_decode from "jwt-decode";
import { API_URL } from "./utils/constants";
import axios from "axios";
import '../src/index.css';

function App() {
  const [token, setToken] = useState( null); //verifico si existe un token en local storage y si existe lo cargo
  const [type, setType] = useState(null);

  useEffect(() => {
    if(token){
      localStorage.setItem("token", token);
      const {tipoUsuario} = jwt_decode(token);
      setType(tipoUsuario);
    }
  }, [token]);

  return (
    <BrowserRouter>
      {/* condicional de pantallas a cargar segun el tipo de usuario */}
      {type === "admin" && <AdminRouter setToken={setToken} type={type}/>}
      {type === "user" && <UserRouter setToken={setToken} type={type}/>}
      {!type && <AuthRouter setToken={setToken} />}
    </BrowserRouter>
  );
}

export default App;
