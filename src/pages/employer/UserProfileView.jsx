import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserData } from "../../services/EmpApi";
import { hideLoading, showLoading } from "../../redux/alertsSlice"
import { useDispatch } from "react-redux";
import EmpUserProPic from "../../components/employer/userpro/EmpUserProPic";
import EmpUserAbout from "../../components/employer/userpro/EmpUserAbout";
import EmpUserExp from "../../components/employer/userpro/EmpUserExp";
import EmpUserSkill from "../../components/employer/userpro/EmpUserSkill";
import EmpUserEdu from "../../components/employer/userpro/EmpUserEdu";
import EmpNavBar from "../../components/employer/EmpNavbar";

export default function UserProfileView() {
  const dispatch = useDispatch();

  const location = useLocation();
  const { id } = location.state || {};
  const [userData, setUserData] = useState();

  useEffect(() => {
    dispatch(showLoading());
    getUserData(id)
      .then((res) => {
        dispatch(hideLoading());
        setUserData(res.data.userData);
        console.log(res.data.userData);
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  }, []);

  const isAuthenticated = true;

  const logOut = () => {
    dispatch(showLoading());
    localStorage.removeItem('empJwt');
    setTimeout(() => {
      dispatch(hideLoading());
      Navigate('/employer/empLogin');
      toast.success('LOGOUT SUCCESSFULLY')
    }, 1000); // Change the delay time as per your preference
  };
  

  if (!userData) return;
  return (
    <>
    <EmpNavBar isAuthenticated={isAuthenticated} logOut = {logOut}/>
    <div className="grid lg:grid-cols-4 mt-6 lg:mx-9 mx-4 md:me-2   ">
      <div className="col-span-4 lg:col-span-1 ">
        <EmpUserProPic userData={userData} />
      </div>
      <div className="lg:col-span-3 col-span-4 lg:me-20">
        <EmpUserAbout userAbout={userData.about} />
        <EmpUserExp userData={userData} />
        <EmpUserSkill userData={userData} />
        <EmpUserEdu userData={userData} />
      </div>
    </div>
    </>
  );
}
