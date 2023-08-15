import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/landingPage'
import AdminRoutes from "./routes/adminRoutes";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import UserRoutes from "./routes/userRoute";
import EmployerRoutes from './routes/empRoute';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorMessage from "./pages/ErrorMessage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const {loading} = useSelector((state) => state.alerts);
  return (
    <>
    <div>
    {/* <div className="w-full max-w-screen-lg"> */}
    <BrowserRouter>
    {loading && (<div className="spinner-parent" role="status">
  <span className="spinner-border"></span>
</div>)}
    <Toaster position="top-center" reverseOrder={false}/>
    <ErrorBoundary FallbackComponent={ErrorMessage}>
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/admin/*" element={<AdminRoutes/>}/>
      <Route path="/user/*" element={<UserRoutes/>}/>
      <Route path="/employer/*" element={<EmployerRoutes/>}/>
    </Routes>
    </ErrorBoundary>
    </BrowserRouter>
    </div>
    {/* </div> */}
    </>
  );
}
export default App;
