import React from "react";
import PostCard from "./PostCard";

const PostList = ({ posts, location, cont}) => {

  return (
    
    <main className="bg-white ">
      <section className="container mx-auto px-0 md:px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4">
          {
            posts.map((post) => (<PostCard key={post._id} post={post} location={location} cont={cont}/>))
          }
        </div>
      </section>
    </main>
  );
};

export default PostList;