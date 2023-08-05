import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import PrivateRoutes from "../protectedRoutes/privateRoutes";
import Home from "../pages/user/Home";
import ForgotPassword from "../pages/user/forgotPassword";
import JobDetailedView from '../pages/user/JobDetailedView';
import Profile from '../pages/user/Profile';

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgotPass" element={<ForgotPassword/>}/>
      <Route element={<PrivateRoutes role={"user"} route={'/user/login'}/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/jobDetailedView" element={<JobDetailedView/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>
  )
}