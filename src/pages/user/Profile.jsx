import React,{useEffect, useState} from "react";
import ProfileImgComp from '../../components/user/profile/ProfileImgComp';
import UserAbout from "../../components/user/profile/UserAbout";
import UserExperiance from "../../components/user/profile/UserExperience";
import UserEducation from "../../components/user/profile/UserEducation";
import UserSkills from '../../components/user/profile/UserSkills';
import BasicInfo from "../../components/user/profile/BasicInfo";
import { useSelector } from "react-redux";
import ChangePassModal from "../../components/user/profile/ChangePassModal";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate=useNavigate()
  const userData = useSelector((state) => state.user.userData);
console.log(userData);
 
  if (userData == null) return;
  return (
    <div className="grid lg:grid-cols-4 mt-6 lg:mx-9 mx-4 md:me-2 mb-5 ">
      <div className="col-span-4 lg:col-span-1 ">
        <ProfileImgComp userData={userData}/>
        <div onClick={()=>navigate("/user/jobrequests")} className="bg-white p-3 rounded-xl md:mx-10 flex mb-3 border border-gray-500 cursor-pointer hover:bg-gray-300 shadow-md ">
          <button  className="text-xl  mx-auto font-bold ">My Requests</button>
        </div>
        <div onClick={()=>navigate("/user/invites")} className="bg-white p-3 rounded-xl md:mx-10 flex mb-3 border border-gray-500 cursor-pointer hover:bg-gray-300 shadow-md ">
          <button className="text-xl  mx-auto font-bold ">Invites</button>
        </div>
        {userData.isGoogle?<div></div>:<ChangePassModal/>}
        
      </div>

      <div className="lg:col-span-3 col-span-4 lg:me-20">
        {/* about .................... */}
        <UserAbout userAbout={userData.about}  />
        {/* work .................... */}

        <UserExperiance userData={userData}  />
        {/* skills.................... */}
        <UserSkills userData={userData}  />
        {/* education.................... */}

        <UserEducation userData={userData}  />
        {/* basic info.................... */}
        <BasicInfo userData={userData}/>
      </div>
    </div>
  );
}