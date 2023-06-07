import React from "react";

const Post = ({ post, user }) => {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-lightMode-component dark:bg-darkMode-component mt-5 rounded-t-lg shadow-sm flex flex-col text-lightMode-txt dark:text-darkMode-txt">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <div className="flex items-center space-x-2 flex-row">
              <img
                className="rounded-full w-10 h-10"
                src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
              />
            </div>
            <div className="ml-3">
              <p className="font-medium">{user.fullname}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 m-4">
          <div>Title : {post.title}</div>
          <div>Author : {post.author}</div>
        </div>
        <p className="ml-4">{post.description}</p>
      </div>
    </div>
  );
};

export default Post;