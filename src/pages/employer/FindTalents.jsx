import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EmpSearchUser from "../../components/employer/FindTalent/EmpSearchUser";
import UserCard from "../../components/employer/FindTalent/UserCard";
import { empSearchUser } from "../../services/EmpApi";
import { toast } from "react-hot-toast";
import { getSinglePostData } from "../../services/EmpApi";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import EmpNavBar from "../../components/employer/EmpNavbar";

export default function FindTalent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = location.state || {};
  const [postData, setPostData] = useState({});
  const [skill, setSkill] = useState("");
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noJobSeekers, setNoJobSeekers] = useState(false);

  useEffect(() => {
    setNoJobSeekers(false);
    dispatch(showLoading());
    empSearchUser(skill)
      .then((res) => {
        setUserData(res.data.userData);
        if (res.data.userData.length === 0) {
          setNoJobSeekers(true); // Set noJobSeekers state if no data is available
        }
        setTimeout(() => {
          dispatch(hideLoading());
        }, 1000);
      })
      .catch((err) => console.log(err));
  }, [skill]);

  useEffect(() => {
    dispatch(showLoading());
    getSinglePostData(id)
      .then((res) => {
        setPostData(res.data.postData);
        dispatch(hideLoading());
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        dispatch(hideLoading());
        setIsLoading(false);
      });
  }, []);

  const isAuthenticated = true;

  const logOut = () => {
    dispatch(showLoading());
    localStorage.removeItem("empJwt");
    setTimeout(() => {
      dispatch(hideLoading());
      Navigate("/employer/empLogin");
      toast.success("LOGOUT SUCCESSFULLY");
    }, 1000); // Change the delay time as per your preference
  };

  console.log(userData.length);

  if (isLoading) {
    return;
  }

  return (
    <>
      <EmpNavBar isAuthenticated={isAuthenticated} logOut={logOut} />
      <div>
        <EmpSearchUser set={setSkill} />
      </div>
      <div className="bg-white h-3"></div>
      {noJobSeekers ? (
        <div className="flex">
          <h1
            className="md:mx-auto font-serif font-bold text-4xl text-xl mx-10 mt-28"
            style={{
              color: "red", // Change the color to your preference
              textAlign: "center", // Center the text
              fontStyle: "italic", // Add italic style
              // Add more CSS properties as needed
            }}
          >
            No job seekers are available for this skill at the moment.
          </h1>
        </div>
      ) : userData.length !== 0 || Object.keys(postData).length !== 0 ? (
        <div>
          <UserCard userData={userData} postData={postData} set={setPostData} />
        </div>
      ) : (
        <div className="flex">
          <h1 className="md:mx-auto font-serif font-bold md:text-4xl text-xl mx-10 mt-28">
            No job seekers are available at this moment !!!
          </h1>
        </div>
      )}
    </>
  );
}
