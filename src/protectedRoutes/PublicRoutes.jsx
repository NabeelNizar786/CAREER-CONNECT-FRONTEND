import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute(props) {

  if(localStorage.getItem('userJwt')) {
    return <Navigate to='/user/home'/>
  } else if (localStorage.getItem('adminJwt')) {
    return <Navigate to='/admin/adminLogin'/>
  } else {
    return props.children;
  }
}

export default PublicRoute