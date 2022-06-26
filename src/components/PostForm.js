import React, { useState, useEffect }from "react";
import { useNavigate } from "react-router-dom";
import PostButton from "./Buttons/PostButton";
import PostInput from "./Inputs/PostInput";
import PostTextArea from "./Inputs/PostTextArea";

const PostForm = ({ onSubmit, handleUpdate, editPost }) => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        image: ""
    });

    useEffect(() => {
        if(editPost) {
            setPost(editPost);
        }
    }, [editPost])

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value} = e.target;
        setPost({
            ...post,
            [name]: value,
        });
    }

    const Back = () => navigate("/home");

    return (
        <div className=" mt-5">
            <form
                className="form"
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit(post);
                }}
            >
                <PostInput
                    label="Title"
                    required
                    placeholder="Titulo de Post"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                />
                <PostTextArea 
                    label="Description"
                    required
                    placeholder="Ingrese la descripcion de tu post"
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                />
                <PostInput 
                    label="URL image"
                    required
                    placeholder="URL de imagen"
                    name="image"
                    value={post.image}
                    onChange={handleChange}
                />
                <p className=" text-xs text-red-500 text-right my-3">
                    Campos requeridos estaran marcados con un asterisco{" "}
                    <abbr title="Required field">*</abbr>
                </p>
                <div className=" mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                    <PostButton onClick={Back}>Exit</PostButton>

                    {editPost ? (
                        <PostButton
                            bgColor="bg-blue-400"
                            hoverColor="bg-blue-500"
                            textColor="text-white"
                            type="submit"
                        >
                            Update
                        </PostButton>
                    ) : 
                    (<PostButton
                        bgColor="bg-green-400"
                        hoverColor="bg-green-500"
                        textColor="text-white"
                        type="submit"
                    >
                        Save
                    </PostButton>)}                   
                </div>
            </form>
        </div>
    )
}

export default PostForm;