import React, { useState,useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import PrivateRoutes from "../protectedRoutes/PrivateRoutes";
import Home from "../pages/user/Home";
import ForgotPassword from "../pages/user/forgotPassword";
import JobDetailedView from '../pages/user/JobDetailedView';
import Profile from '../pages/user/Profile';
import { useNavigate } from "react-router-dom";
import PublicRoute from "../protectedRoutes/PublicRoutes";
import NotFoundPage from "../pages/NotFoundPage";
import UserChat from "../pages/user/userChat";
import UserEmpProfileview from "../pages/user/UserEmpProfileview";
import Invites from "../pages/user/Invites";
import JobRequests from "../pages/user/JobRequests";
import VideoCall from '../pages/VideoCall';

export default function UserRoutes() {
  
  return (
    <Routes>
    <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
      <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
      <Route path="/forgotPass" element={<ForgotPassword/>}/>
      <Route element={<PrivateRoutes role={"user"} route={'/user/login'}/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/jobDetailedView" element={<JobDetailedView/>}/>
        <Route path="/employer/profile" element={<UserEmpProfileview />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/invites" element={<Invites />} />
        <Route path="/jobrequests" element={<JobRequests />} />
        <Route path="/userChat" element={<UserChat />} />
        {/* <Route path="/userMeeting" element={<VideoCall/>}/> */}
      </Route>
    </Routes>
  )
}