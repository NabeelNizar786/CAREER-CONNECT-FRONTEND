import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/adminLogin";
import AdminHome from '../pages/admin/adminHome';
import PrivateRoutes from "../protectedRoutes/privateRoutes";



function AdminRoutes() {
  return (
    <Routes>

      <Route path="/adminLogin" element={<AdminLogin/>}/>
      <Route element={<PrivateRoutes role={"admin"} route={'/admin/adminLogin'}/>}>
        <Route path="/adminHome" element={<AdminHome/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRoutes