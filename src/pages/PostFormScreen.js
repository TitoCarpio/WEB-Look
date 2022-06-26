import React, {useEffect, useState} from 'react';
import axios from "axios";
import PostTitle from "../components/PostTitle";
import PostForm from "../components/PostForm";
import { API_URL } from "../utils/constants";
import { useNavigate, useParams } from 'react-router-dom';

function PostFormScreen() {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    const navigate = useNavigate();
    const { idPost } = useParams();
    const [postEdit, setpostEdit] = useState(null);

    useEffect(() => {
        if(idPost) {
            axios
            .get(`${API_URL}/post/one/${idPost}`, {
                headers: { Authorization: authHeader },
            })
            .then((res) => {
                const {data} = res;
                setpostEdit(data);
            })
            .catch((err) => console.log(err));
        }
    }, [])

    const onCreatePost = (post) => {
        axios.post(`${API_URL}/post/create`, post, {
            headers: { Authorization: authHeader },
        })
        .then(response => {
            const { data } = response;
            console.log(data)
            navigate("/home")
        })
        .catch(error => console.log(error));
    }

    const onUpdatePost = (post) => {

        axios.put(`${API_URL}/post/update/${idPost}`, post, {
            headers: { Authorization: authHeader },
        })
        .then(response => {
            const { data } = response;
            console.log(data)
            navigate("/home")
        })
        .catch(error => console.log(error));
    }

    return (
        <div className="min-h-screen flex justify-center bg-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
                    <div className="grid  gap-8 grid-cols-1">
                        <div className="flex flex-col ">
                        <PostTitle>CREATE POST</PostTitle>
                        <PostForm onSubmit={ idPost ? onUpdatePost : onCreatePost} handleUpdate={() => {}} editPost={postEdit} />
                        </div>
                    </div>
                </div>
        </div>
  );
}

export default PostFormScreen


