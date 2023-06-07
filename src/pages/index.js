import dbConnect from "@/dbConnect";
import MainLayout from "@/layouts/MainLayout";
import Reviews from "@/models/reviewModel";
import Users from "@/models/userModel";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import Post from "@/components/Post";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "@/lib/lib";
import "react-toastify/dist/ReactToastify.css";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  dbConnect().catch((error) => console.log(error));

  //current user
  let res = await Users.findById(session.user.id);
  const user = JSON.parse(JSON.stringify(res));

  //all posts by current user
  res = await Reviews.find().sort({ updatedAt: -1 });
  const posts = res.map((doc) => {
    const post = JSON.parse(JSON.stringify(doc));
    return post;
  });

  return {
    props: { user, posts },
  };
}

const feed = ({ user, posts }) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onSubmit = async (values, error) => {
    const { description, author, title } = values;
    const res = await axios.post("/api/review", {
      userId: user._id,
      description,
      author,
      title,
    });

    if (res.status === 200) {
      toast.success(res.data.msg, toastOptions);
      setTimeout(refreshData);
    } else {
      toast.error(res.data.msg, toastOptions);
    }
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      author: "",
      title: "",
    },
    onSubmit,
  });

  return (
    <MainLayout>
      <div className="bg-lightMode-background justify-center flex dark:bg-darkMode-background overflow-y-scroll scrollbar-hide w-full h-full">
        <div className=" max-w-3xl w-full flex flex-col gap-5 p-5 pt-7">
          <div className="text-sm">
            <div
              id="inputBox"
              className="bg-lightMode-component mb-4 dark:bg-darkMode-component dark:text-darkMode-txt p-2 rounded-lg shadow-md text-lightMode-txt font-medium content-center items-center"
            >
              <div className=" flex  space-x-4 p-2 px-4 ">
                <img
                  className="rounded-full w-10 h-10 mt-1 top-0"
                  src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                  alt=""
                />
                <form
                  action=""
                  className="flex flex-1 flex-col"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="w-full flex gap-3 py-3 flex-wrap justify-evenly">
                    <input
                      type="title"
                      name="title"
                      id="title"
                      className="w-64 rounded-xl bg-gray-100 dark:bg-neutral-800 flex flex-grow p-4 focus:outline-none"
                      placeholder="Enter Book's Title"
                      required=""
                      {...formik.getFieldProps("title")}
                    />
                    <input
                      type="author"
                      name="author"
                      id="author"
                      className="w-64 rounded-xl bg-gray-100 dark:bg-neutral-800 flex flex-grow p-4 focus:outline-none"
                      placeholder="Enter Author's Name"
                      required=""
                      {...formik.getFieldProps("author")}
                    />
                  </div>
                  <textarea
                    rows="5"
                    className="rounded-xl bg-gray-100 dark:bg-neutral-800 flex flex-grow p-4 focus:outline-none "
                    placeholder="What's on your Mind about the Book?"
                    {...formik.getFieldProps("description")}
                  />
                  <div className="flex border-t-[1px] mt-2 pt-2 justify-center border-neutral-300 dark:border-neutral-500 gap-2">
                    <button
                      type="submit"
                      className="rounded-md w-1/3 text-center text-black dark:text-white p-2 bg-darkMode-btn"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div id="Post" className="mb-10">
              {posts.map((post) => {
                return <Post post={post} user={user} key={post._id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default feed;
