import React, { useState, useEffect } from "react";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import PostList from "../components/PostList";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import Navigationbuttons from "../components/Buttons/Navigationbuttons";

//OwnedScreen
function OwnedScreen({ type }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    const navigate = useNavigate();
    const located = true;

    useEffect(() => {
        axios
        .get(`${API_URL}/post/owned?limit=21&page=${page}`, {
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

    //funcion para Regresar a Pagina Main
    const onLogout = () => navigate("/home");

    //Funcion para ir a la pagina de agregar nuevo post
    const onAddPost = () => navigate("/post/new");

    const onFav = () => navigate("/post/fav")

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
        <div>
            {/* Agregando responsive bajo de 640px */}
            <div className="relative w-full h-10 bg-gray-800 text-gray-200 flex flex-row justify-between items-center sn:flex-col sn:h-full">
                <label className=" font-semibold text-4xl mb-4 text-white-500 ">
                {/*sf:text-pink-600  */}
                Insta
                <span className="font-semibold text-white text-opacity-100">
                    Post
                </span>
                </label>
                
                <ul className="menu-list lg:flex lg:flex-row text-xs font-bold sn:flex flex-row sm:flex sm:flex sm:w-auto sn:flex sn:flex-row">
                <li className="menu-list-item px-2 flex flex-wrap content-center"></li>

                <li className="menu-list-item px-2">
                    <PrimaryButton onClick={onFav} color="bg-yellow-500">Fav</PrimaryButton>
                </li>
                <li className="menu-list-item px-2">
                    {type === "admin" && (
                    <PrimaryButton onClick={onAddPost} color="bg-green-500">
                        New
                    </PrimaryButton>
                    )}
                </li>
                <li className="menu-list-item px-2">
                    <PrimaryButton onClick={onLogout}>Back</PrimaryButton>
                </li>
                </ul>
            </div>
            <div>
                {
                <div className="flex flex-wrap justify-center items-center m-6 md:flex w-auto just">
                    <Navigationbuttons onClick={backPage}>Prev</Navigationbuttons>
                    <Navigationbuttons onClick={nextPage}>Next</Navigationbuttons>
                </div>
                }
                <PostList posts={posts} location={located}/>

                {
                <div className="flex flex-wrap justify-center items-center m-6 md:flex w-auto just">
                    <Navigationbuttons onClick={backPage}>
                    Prev
                    {/* <a href="#" className= "border-8 border-transparent"> Prev</a> */}
                    </Navigationbuttons>
                    <Navigationbuttons onClick={nextPage} >
                    Next
                    {/* <a href="#" className= "border-8  border-transparent"> Next</a> */}
                    </Navigationbuttons>
                </div>
                }
            </div>
        </div>
    );
}


export default OwnedScreen;

//  Responsive
/* Laptop lg => @media (min-width: 1280px) { ... } */
/* Phone sm  => @media (min-width: 640px)          */
/* Small Devices sn => @media (min-width: 640px)   */
