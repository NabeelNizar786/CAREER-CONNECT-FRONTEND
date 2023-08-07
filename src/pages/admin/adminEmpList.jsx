import React,{useState,useEffect} from 'react';
import { useDispatch } from "react-redux";
import EmpTable from '../../components/admin/empTable';
import { adminEmpDetails } from '../../services/adminApi';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import Layout from '../../components/Layout';
import { changeEmpStatus } from '../../services/adminApi';

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
  },[]);

  const changeStatus = (id, status) => {
    changeEmpStatus({ id: id, status: status })
      .then((res) => {
        setEmpData(res.data.empData);
        console.log(res.data.empData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
    <div className="">
      <EmpTable change={changeStatus} empData={empData} />
    </div>
    </Layout>
  )
}