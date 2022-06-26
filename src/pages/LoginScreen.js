import React, { useState } from "react";
import AuthButton from "../components/Buttons/AuthButton";
import AuthInput from "../components/Inputs/AuthInput";
import FooterLink from "../components/FooterLink";
import axios from "axios";
import { API_URL } from "../utils/constants";

function LoginScreen({setToken}) {

  const [formValues, setFormValues] = useState({
    correo: "",
    contrasena: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(formValues)
    axios.post(`${API_URL}/usuarios/sesion`, formValues)
    .then((response) => {
      console.log(response)
       const { data } = response;
       const { token } = data;
      setLoading(false);
      setToken(token);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  return (
    
    <div class="w-full h-screen display: flex items-center justify-center bg-gray-800">
      <div className="w-full h-screen display: flex items-center justify-center bg-white">ACAC va el video</div>
      <form
        className="bg-gray-400 sm:w-110 lg:w-85 w-96 h-auto rounded-lg pt-8 pb-8 px-8 flex flex-col items-center"

         onSubmit={handleSubmit}
      >
       
        <label className=" font-semibold text-6xl mb-4 ">
          Looking<span className="font-semibold text-white text-opacity-100">Place</span>
        </label>
        <AuthInput
          type="text"
          name="correo"
          placeholder="Email"
          onChange={handleChange}
        />
        <AuthInput
          type="password"
          name="contrasena"
          placeholder="Password"
          onChange={handleChange}
        />
        <AuthButton loading={loading}>Iniciar Sesion</AuthButton>
        <FooterLink
          label="Bienvenido a LookingPlace"
        />
      </form>
    </div>
  );
}

export default LoginScreen;
