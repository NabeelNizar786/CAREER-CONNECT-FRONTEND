import React, { useEffect, useState } from "react";
import Categorys from "../../components/employer/JobApplicants/Categories";
import UserApplicationCard from "../../components/user/userApplication/UserApplicationCard";
import { getUserApplications } from "../../services/userApi";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import NavBar from "../../components/navBar";
export default function JobRequests() {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState([]);
  const [status, setStatus] = useState("Pending");
  useEffect(() => {
    dispatch(showLoading());
    getUserApplications(status)
      .then((res) => {
        dispatch(hideLoading());
        setPostData(res.data.postData);
      })
      .catch((err) => {
        dispatch(hideLoading());
      });
  }, [status]);

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
      <div className="mt-12">
        <Categorys status={status} set={setStatus} />
      </div>
      {postData.length != 0 ? (
        <div>
          <UserApplicationCard posts={postData} status={status} />
        </div>
      ) : (
        <div className="flex justify-center mt-36">
          <h1 className="md:text-4xl font-bold font-serif">
            You Have No {status} Applications{" "}
          </h1>
        </div>
      )}
    </div>
  );
}