import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/constants";
import Back from "../components/Buttons/Back";
import { AiFillHeart } from "react-icons/ai";
import { IoIosStarOutline } from "react-icons/io";
// import { BsChatSquareFill } from "react-icons/bs";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import Comments from "../components/Comments/Comments";


function PostScreen() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const authHeader = `Bearer ${token}`;
  const { idPost } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({
    description: ""
  })
  const navigate = useNavigate();

  const [constLikes, setConstLikes] = useState({
    likes: 0,
    state: "add"
  });
  const [commentPost, setCommentPost] = useState([])

  useEffect(() => {
    axios
      .get(`${API_URL}/post/one/${idPost}`, {
        headers: { Authorization: authHeader },
      })
      .then((res) => {
        const { data } = res;
        setPost(data);
        setConstLikes({
          likes: data.likes.length,
          state: data.likes.some((like) => like.username === username) ? "remove": "add"
        });
        setCommentPost(data.comments)
      })
      .catch((err) => console.log(err));
  }, []);

  if (!post) return null;

  const { _id,title, description, image, likes, comments } = post;

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
        console.log(data);
        handleLikes();
    })
    .catch((err) => console.log(err))
  }

  const onBack = () => navigate("/home");



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

  //funcion para mostrar los comentarios
  const showComments = (comment) => {
    
    return  <Comments user={comment.user.username} description={comment.description} />
    
  };
  //Parte de la funcion para agregar comentarios
  const handleComment = (e) => {
    const { name, value} = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  }
  //funcion donde se hace el Patch a la API con el comentario
  const AddComment = (comm) => {
    axios.patch(`${API_URL}/post/comment/${_id}`, comm, {
      headers: 'content-type: application/x-www-form-urlencoded',
      headers: { Authorization: authHeader },
    })
    .then((res) => {
        const { data } = res
        setCommentPost([ ...commentPost, { user: { username: username},
        description: comment.description}])
        console.log(data)
    })
    .catch((err) => console.log(err))
  }
  return (
    <div className="w-100 h-screen flex items-center justify-center bg-gray-100 sn:flex-col sn:h-auto sn:bg-white">
        <div className="w-auto h-100 max-h-96 justify-center bg-gray-100 sn:w-auto sn:bg-white sn:mt-5">
          <img
            src={image}
            alt="car"
            className="rounded-t-lg h-80 max-h-96 w-top object-cover justify-items-center"
          />
        </div>

        <div className="p-8 flex-col justify-items-center bg-white h-1/2 md:h-80 md:flex-col">
          <div className = "flex flex-row  justify-between ">
            <div 
              className="absolute h-10 w-10 flex items-center justify-center text-xl rith bg-white hover:bg-red-500 text-red-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
              onClick={liked}
            >
              <AiFillHeart />
              <span
              className="text-gray-800 m-1 group-hover:text-white"
              >
                {constLikes.likes}
              </span>
            </div>
            <div
              className="h-10 w-10 ml-11 flex items-center right-2 justify-center text-xl bg-white hover:bg-yellow-500 text-yellow-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <IoIosStarOutline />
            </div>
            <Back onClick={onBack}>Back to Home</Back>
          </div >
          <h2 className="font-bold">{title}</h2>
          <p className=" max-h-10 m-2 overflow-auto w-96 font-normal leading-none text-sm tracking-wider text-left ">{description}</p>
            <div className = "justify-items-center max-h-28 max-w-md overflow-auto m-2">{
                commentPost.map(comment => showComments(comment))

                // comments.map((comment) => (
                //     <p>comentarios: {comment.description}</p>
                // ))
            }</div>

            {/* Bar commet */}
          <div className=" flex justify-center items-center m-1">
            <form
              className=" flex  md:m-2 sn:m-2"
              onSubmit={(event) => {
                event.preventDefault();
                AddComment(comment)
                setComment({ description: ""})
              }}
            >
              <label className='relative cursor-pointer -top-1'>
                <input type="text" placeholder="Input" 
                  name="description"
                  value={comment.description} 
                  onChange={handleComment}
                  className='h-11 w-80 px-6 text-xs text-black bg-gray-100  border-gray-600 border-2 rounded-lg border-opacity-50 outline-none focus:border-gray-300 placeholder-gray-300 placeholder-opacity-0 transition duration-200'
                />
                <span 
                  className='text-sm text-black text-opacity-80 bg-gray-100  absolute left-5 top- px-1 transition duration-200 input-text font-bold'
                >Comment</span>
              </label>
              <button className=" h-11 w-12 relative -top-4 bg-gradient-to-tr from-yellow-500 to-pink-400  rounded-lg py-2 px-4 mt-3"
                type="submit"
              >
                <AiOutlinePlus/>
              </button>
            </form>
          </div>      
        </div>
    </div>
  );
}

export default PostScreen;
