import React from 'react'
import { Route, Routes } from 'react-router-dom';
import EmployerRegister from '../pages/employer/employerRegister';
import EmployerLogin from '../pages/employer/employerLogin';
import EmployerHome from '../pages/employer/employerHome';
import PrivateRoutes from '../protectedRoutes/privateRoutes';

export default function empRoute() {
  return (
    <Routes>
      <Route path='/empRegister' element={<EmployerRegister/>}/>
      <Route path='/empLogin' element={<EmployerLogin/>}/>
      <Route element={<PrivateRoutes role={"employer"} route={'/employer/empLogin'}/>}>
        <Route path='/empHome' element={<EmployerHome/>}/>
      </Route>
    </Routes>
  )
}

