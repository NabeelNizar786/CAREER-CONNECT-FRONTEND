import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/adminLogin";
import AdminHome from '../pages/admin/adminHome';
import AdminUsersList from '../pages/admin/adminUsersList'; 
import PrivateRoutes from "../protectedRoutes/privateRoutes";
import Employers from "../pages/admin/adminEmpList";
import Requests from "../pages/admin/requests";
import City from "../pages/admin/City";
import Skills from "../pages/admin/Skills";
import Subscriptions from "../pages/admin/Subscriptions";
import NotFoundPage from "../pages/NotFoundPage";



function AdminRoutes() {
  return (
    <Routes>

<Route path="*" element={<NotFoundPage />} />
      <Route path="/adminLogin" element={<AdminLogin/>}/>
      <Route element={<PrivateRoutes role={"admin"} route={'/admin/adminLogin'}/>}>
        <Route path="/adminHome" element={<AdminHome/>}/>
        <Route path="/usersList" element={<AdminUsersList/>}/>
        <Route path="/empList" element={<Employers/>}/>
        <Route path="/approvalReq" element={<Requests/>}/>
        <Route path="/cityList" element={<City/>}/>
        <Route path="/skillsList" element={<Skills/>}/>
        <Route path="/subscriptionsList" element={<Subscriptions/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRoutes