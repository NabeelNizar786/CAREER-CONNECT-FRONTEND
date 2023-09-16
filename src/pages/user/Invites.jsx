import React, { useEffect, useState } from "react";
import JobPost from "../../components/user/userJobPost/JobPost";
import { invitedJobs } from "../../services/userApi";
import NavBar from "../../components/navBar";

export default function Invites() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    invitedJobs()
      .then((res) => {
        setPosts(res.data.postData);
        // console.log(res.data.postData);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  const isAuthenticated = true;

  const logOut = () => {
    dispatch(showLoading());
    localStorage.removeItem('userJwt');
    setTimeout(() => {
      dispatch(hideLoading());
      Navigate('/user/login');
      toast.success('LOGOUT SUCCESSFULLY')
    }, 1000); // Change the delay time as per your preference
  };


  return (
    <div>
        <NavBar isAuthenticated={isAuthenticated} logOut = {logOut}/>
      <div className="flex">
        <h1 className="font-black font-serif mx-auto mt-10 mb-3  text-6xl">
          Invites
        </h1>
      </div>

      <div>{posts.length !== 0 && <JobPost posts={posts} />}</div>
    </div>
  );
}
