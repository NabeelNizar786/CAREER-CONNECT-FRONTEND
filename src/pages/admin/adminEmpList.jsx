import React,{useState,useEffect} from 'react';
import { useDispatch } from "react-redux";
import EmpTable from '../../components/admin/empTable';
import { adminEmpDetails } from '../../services/adminApi';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import Layout from '../../components/Layout';

export default function Employers () {

  const [empData, setEmpData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoading())
    adminEmpDetails()
    .then((res)=> {
      dispatch(hideLoading())
      setEmpData(res.data.empData)
    })
  },[])

  return (
    <Layout>
    <div className="">
      <EmpTable empData={empData} />
    </div>
    </Layout>
  )
}