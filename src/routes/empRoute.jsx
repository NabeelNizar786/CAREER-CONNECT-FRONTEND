import React from 'react'
import { Route, Routes } from 'react-router-dom';
import EmployerRegister from '../pages/employer/employerRegister';
import EmployerLogin from '../pages/employer/employerLogin';
import EmployerHome from '../pages/employer/employerHome';
import PrivateRoutes from '../protectedRoutes/privateRoutes';
import ForgotPassword from '../pages/employer/forgotPass';
import EmployerProfile from '../pages/employer/EmployerProfile';
import JobApplicants from '../pages/employer/JobApplicants';
import PremiumPlan from '../pages/employer/PremiumPlan';
import PaymentSuccess from '../pages/employer/PaymentSuccess';
import FindTalent from '../pages/employer/FindTalents';

export default function empRoute() {
  return (
    <Routes>
      <Route path='/empRegister' element={<EmployerRegister/>}/>
      <Route path='/empLogin' element={<EmployerLogin/>}/>
      <Route path='/forgotPass' element={<ForgotPassword/>}/>
      <Route element={<PrivateRoutes role={"employer"} route={'/employer/empLogin'}/>}>
        <Route path='/empHome' element={<EmployerHome/>}/>
        <Route path='/empProfile' element={<EmployerProfile/>}/>
        <Route path='/jobApplicants' element={<JobApplicants/>}/>
        <Route path='/subscription' element={<PremiumPlan/>}/>
        <Route path='/paymentSuccess/:empId' element={<PaymentSuccess/>}/>
        <Route path='/post/FindTalent' element={<FindTalent/>}/>
      </Route>
    </Routes>
  )
}

