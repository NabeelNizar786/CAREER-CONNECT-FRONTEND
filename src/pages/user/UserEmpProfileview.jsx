import React from "react";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { userGetEmpDetails } from "../../services/userApi";
import { toast } from "react-hot-toast";
import UserEmpPropic from "../../components/user/EmpProfile/UserEmpPropic";
import UserViewEmpAbout from "../../components/user/EmpProfile/UserViewEmpAbout";
import UserEmpBasicInfo from "../../components/user/EmpProfile/UserEmpBasicInfo";
import NavBar from "../../components/navBar";
import VideoCallIcon from "../../components/VideoCallIcon";

export default function UserEmpProfileview() {
    const dispatch=useDispatch()
  const location = useLocation();
  const { id } = location.state || {};
  console.log(id);
  const [empData, setEmpData] = useState();
  const [showVideoCallIcon, setShowVideoCallIcon] = useState(false);


  useEffect(() => {
    dispatch(showLoading());
    userGetEmpDetails(id)
      .then((res) => {
        dispatch(hideLoading());
        setEmpData(res.data.empData);
        console.log(res.data.empData);  
      
      })
      .catch((err) => {
        toast.error(err.message)
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

  useEffect(() => {
    // Function to update the showVideoCallIcon state based on the current time
    const updateVideoCallIconState = () => {
      // Get the current time
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      // Check if the current time is between 3pm and 4pm
      const isVideoCallTime = currentHour === 19;

      // Update the showVideoCallIcon state based on the time condition
      setShowVideoCallIcon(isVideoCallTime);
    };

    // Call the function initially
    updateVideoCallIconState();

    // Set up an interval to periodically check and update the state
    const intervalId = setInterval(updateVideoCallIconState, 60000); // Check every minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);  

  if(!empData)return
  return (
    <>
    <NavBar isAuthenticated={isAuthenticated} logOut = {logOut}/>
    <div className="grid lg:grid-cols-4 mt-6 lg:mx-9 mx-4 md:me-2 mb-5 ">
      <div className="col-span-4 lg:col-span-1 ">
       <UserEmpPropic empData={empData}/>
      </div>
      <div className="lg:col-span-3 col-span-4 lg:me-20">
        <UserViewEmpAbout empData={empData}/>
        <UserEmpBasicInfo empData={empData}/>
        </div>
        {showVideoCallIcon && (
          <button >
            <VideoCallIcon />
          </button>
        )}
      </div>
    </>
  );
}