import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserTable from "../../components/admin/userTable";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { adminUserDetails } from "../../services/adminApi";
import Layout from '../../components/Layout';


export default function User () {

  const [userData,setUserData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoading());
    adminUserDetails()
    .then((res)=> {
      dispatch(hideLoading());
      setUserData(res.data.userData)
    })
  },[]);

  return (
    <Layout>
    <div className="">
      <UserTable userData={userData}/>
    </div>
    </Layout>

  )

}