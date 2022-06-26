import React, { useState, useEffect } from "react";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import PostList from "../components/PostList";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import Navigationbuttons from "../components/Buttons/Navigationbuttons";

function HomeScreen({ setToken, type }) {
  // HomeScreen
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const token = localStorage.getItem("token");
  const authHeader = `Bearer ${token}`;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/post/all?limit=21&page=${page}`, {
        // aca hacer que el limit y el page sean dinamicos con la paginacion como de Pokedex
        headers: { Authorization: authHeader },
      })
      .then((response) => {
        const res = response;
        const { data } = res;
        setPosts(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  //funcion para eliminar eltoken de la localstorage y cerrara la sesion
  const onLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  //Funcion para ir a la pagina de agregar nuevo post
  const onAddPost = () => navigate("/post/new");
  //Funcion para ir a pagina de post del propietario
  const onOwner = () => navigate("/post/owner");

  const onFav = () => navigate("/post/fav");

  //Funcion encargada de hacer la paginacion de HomeScreen
  const nextPage = () => {
    var next = page + 1;
    setPage(next);
     goToTop();
  };
  const backPage = () => {
    if (page !== 0) {
      var back = page - 1;
      setPage(back);
      goToTop();
    }
  };

  //funcio para ir hasta arriba de mi pagina
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // <div>
    //   <div className="relative w-full h-10 bg-gray-800 text-gray-200 flex flex-row justify-between items-center sn:flex-col sn:h-full">
    //     <label className=" font-semibold text-4xl mb-4 text-white-500 md:text-gray-500">
    //       Insta
    //       <span className="font-semibold text-white text-opacity-100">
    //         Post
    //       </span>
    //     </label>
    //     <ul className=" menu-list lg:flex lg:flex-row text-xs font-bold md:flex sm:flex sm:w-auto sn:flex sn:flex-row">
    //       <li className="menu-list-item px-2 flex flex-wrap content-center"></li>
    //       <li className="menu-list-item px-2 md:px-0">
    //         {type === "admin" && (
    //           <PrimaryButton onClick={onOwner} color="bg-blue-400">Owner</PrimaryButton>
    //         )}
    //       </li>
    //       <li className="menu-list-item px-2 md:px-0">
    //         <PrimaryButton onClick={onFav} color="bg-yellow-500">Fav</PrimaryButton>
    //       </li>
    //       <li className="menu-list-item px-2 md:px-0">
    //         {type === "admin" && (
    //           <PrimaryButton onClick={onAddPost} color="bg-green-500">
    //             New
    //           </PrimaryButton>
    //         )}
    //       </li>
    //       <li className="menu-list-item px-2 md:px-0">
    //         <PrimaryButton onClick={onLogout}>Logout</PrimaryButton>
    //       </li>
    //     </ul>
    //   </div>
    //   <div>
    //     {
    //       <div className="flex flex-wrap justify-center items-center m-6 md:flex w-auto just">
    //         <Navigationbuttons onClick={backPage}>Prev</Navigationbuttons>
    //         <Navigationbuttons onClick={nextPage}>Next</Navigationbuttons>
    //       </div>
    //     }
    //     <PostList posts={posts} type={type} cont={0}/>

    //     {
    //       <div className="flex flex-wrap justify-center items-center m-6 md:flex w-auto just">
    //         <Navigationbuttons onClick={backPage}>
    //           Prev
    //         {/* <a href="#" className= "border-8 border-transparent"> Prev</a> */}
    //         </Navigationbuttons>
    //         <Navigationbuttons onClick={nextPage}  >
    //           Next
    //         {/* <a href="#" className= "border-8  border-transparent"> Next</a> */}
    //         </Navigationbuttons>
    //       </div>
    //     }
    //   </div>
     
    // </div>

    <div>acabas de acceder</div>
    
      
    
  );
}


export default HomeScreen;

//  Responsive
/* Laptop lg => @media (min-width: 1280px) { ... } */
/* Phone sm  => @media (min-width: 640px)          */
/* Small Devices sn => @media (min-width: 640px)   */