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
import EmpChat from '../pages/employer/EmpChats';
import UserProfileView from '../pages/employer/UserProfileView';
import NotFoundPage from '../pages/NotFoundPage';
import AllPost from '../pages/employer/AllPost';
import VideoCall from '../pages/VideoCall';

export default function empRoute() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path='/empRegister' element={<EmployerRegister/>}/>
      <Route path='/empLogin' element={<EmployerLogin/>}/>
      <Route path='/forgotPass' element={<ForgotPassword/>}/>
      <Route element={<PrivateRoutes role={"employer"} route={'/employer/empLogin'}/>}>
        <Route path='/empHome' element={<EmployerHome/>}/>
        <Route path='/empProfile' element={<EmployerProfile/>}/>
        <Route path='/jobApplicants' element={<JobApplicants/>}/>
        <Route path="/applicants/profile" element={<UserProfileView />} />
        <Route path="/allposts" element={<AllPost />} />
        <Route path='/subscription' element={<PremiumPlan/>}/>
        <Route path='/paymentSuccess/:empId' element={<PaymentSuccess/>}/>
        <Route path='/post/FindTalent' element={<FindTalent/>}/>
        <Route path="/message" element={<EmpChat/>} />
        {/* <Route path="/empMeeting" element={<VideoCall/>}/> */}
      </Route>
    </Routes>
  )
}

