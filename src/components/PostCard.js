import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { IoIosStarOutline } from "react-icons/io";
import { BsChatSquareFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'



const PostCard = ({ post, location=false,cont }) => {
  
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const authHeader = `Bearer ${token}`;
  const navigate = useNavigate();
  

  const {
    _id,
    title,
    description,
    image,
    comments,
    likes,
    active
  } = post;
  const [flagVisible, setflagVisible] = useState(active);

  //creando una alerta de confirmacion de agregado a favorito
  const successfulAlert = () => {
    Swal.fire(
      'Was Added To Favorites!',
      '',
      'success'
    )
  }
  //creacion de alerta de remover de favoritos
  const removeulAlert = () => {
    Swal.fire(
      'Was Removed From Favorites!',
      '',
      'info'
    )
  }

// creacion de alerta de error de agregado a favorito
  const failedAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Could Not Add To Favorites!',
    })
  }
  

  //Funcion que realiza el actualizado de post que se marcan con Likes
  const liked = (likes) => {
    const data = {
        likes: likes.length + 1     
    };
    
    axios
    .patch(`${API_URL}/post/like/${_id}`, data, {
        headers: { Authorization: authHeader },
    })
    .then((res) => {
        const { data } = res
        handleLikes();
        console.log(data)
        
    })
    .catch((err) => console.log(err))
  }

  const addFavorite = () => {
    
    axios.patch(`${API_URL}/post/fav/${_id}`,{}, {
      headers: { Authorization: authHeader },
    })
    .then((res) => {
      const { data } = res
      console.log(data)
      clickFav();
      
    })
    .catch((err) => {
      failedAlert();
      console.log(err)
    })
    
  }

  const onEdit = () => navigate(`/post/edit/${_id}`)

  const [constLikes, setConstLikes] = useState({
    likes: likes.length,
    state: likes.some((user) => user.username === username ) ? "remove" : "add"
  });

  const handleLikes = () => {
    switch (constLikes.state) {
      case "add":
        setConstLikes({
          likes: constLikes.likes + 1,
          state: "remove"
        });
        break;
      case "remove":
        setConstLikes({
          likes: constLikes.likes - 1,
          state: "add"
        });
        break;
      default:
        break;
    }
  }

let  contClick = cont;
  const clickFav = () => {
    
    switch (contClick) {
      case 0:
        successfulAlert();
        contClick = 1;
        break;
      case 1:
        removeulAlert();
        contClick = 0;
        break;
      default:
        break;
    }
  }


  //Funcion para realizar el cambio de visibilidad de post del ADMIN
  const onShow = (active) => {
    if(flagVisible) {
      const data = {
        active: false
      };
      axios
      .patch(`${API_URL}/post/toggle/${_id}`, data, {
          headers: { Authorization: authHeader },
      })
      .then((res) => {
          const { data } = res
          console.log(data);
      })
      .catch((err) => console.log(err))

      setflagVisible(false);
    }else {
      const data = {
        active: false
      };
      axios
      .patch(`${API_URL}/post/toggle/${_id}`, data, {
          headers: { Authorization: authHeader },
      })
      .then((res) => {
          const { data } = res
          console.log(data);
      })
      .catch((err) => console.log(err))

      setflagVisible(true);
    }
  }

  return (
    
    <div className="bg-white hover:bg-gray-800 shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
      <div className="relative mt-2 mx-2">
        <Link
          to={`/post/${_id}`}
          className="h-56 rounded-2xl overflow-hidden"
        >
          <img className="object-cover w-full h-full" src={image} alt={_id} />
        </Link>
        <div className="absolute bottom-0 left-0 -mb-4 ml-3 flex flex-row">
          <div
            className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            onClick={liked}
          >
            <AiFillHeart />
            <span
            className="text-gray-800 m-1 group-hover:text-white"
            >
              {constLikes.likes}
            </span>
          </div>
          <Link
            to={`/post/${_id}`}
            className="h-10 w-16 ml-2 bg-white hover:bg-gray-300 flex items-center justify-center font-medium text-gray-600 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out group"
          >
            <BsChatSquareFill />
            <span
              className="text-gray-800 ml-2 group-hover:text-white"
            >
              {comments.length}
            </span>
          </Link>
          <div
            className="h-10 w-10 ml-1 flex items-center justify-center text-xl bg-white hover:bg-yellow-500 text-yellow-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            onClick={addFavorite}
          >
            <IoIosStarOutline />
          </div>
          {/* parte donde se evalua si es propietario entonces mostrara el icono de Editar */}
          {location && (<div
            className="h-10 w-10 ml-1 flex items-center justify-center text-xl bg-white hover:bg-gray-500 text-gray-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            onClick={onEdit}
          >
            <BsFillPencilFill />
          </div>)}
          {location && (<div
            className="h-10 w-10 ml-1 flex items-center justify-center text-xl bg-white hover:bg-gray-500 text-gray-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            onClick={onShow}
          >
            {flagVisible ? <AiFillEye/> : <AiFillEyeInvisible />}
          </div>)}
        </div>
      </div>
      <Link
        to={`/post/${_id}`}
        className="pt-10 pb-6 w-full px-4"
      >
        <h2 className="font-medium leading-none text-base tracking-wider text-gray-500">{title}</h2>
        
      </Link>
      <Link 
      to={`/post/${_id}`}
      className="pt-10 pb-6 w-full px-4"
      >
      <p className=" text-gray-500 font-medium leading-none text-sm tracking-wider text-center pb-3">
          {description} 
      </p> 
      </Link>
    </div>
  );
};

export default PostCard;