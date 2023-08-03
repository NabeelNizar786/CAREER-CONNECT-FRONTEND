import React,{ useEffect,useState } from "react"
import { useDispatch } from "react-redux"
import { showLoading,hideLoading } from "../../redux/alertsSlice"
import Layout from "../../components/Layout"
import { employerRequests } from "../../services/adminApi"
import EmpVerifyTable from "../../components/admin/EmpVerifyTable"
import { employerVerify } from "../../services/adminApi"


function Requests() {

  const [empData,setEmpData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoading());
    employerRequests()
    .then((res)=> {
      dispatch(hideLoading());
      setEmpData(res.data.empData)
    })
  },[]);

  const empVerify = (email) => {
    dispatch(showLoading());
    employerVerify({email:email}).then((res)=> {
      dispatch(hideLoading());
      setEmpData(res.data.empData)
    }).catch((err)=> {
      console.log(err);
    })
  }

  return (
    <Layout>
    <div>
      <EmpVerifyTable verify={empVerify} empData={empData}/>
    </div>
    </Layout>
  )
}

export default Requests