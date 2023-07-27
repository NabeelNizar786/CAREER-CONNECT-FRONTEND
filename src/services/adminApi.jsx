import { adminAxiosInstence } from "../utils/axios-utils";

const adminLogin = (value) => {
  return adminAxiosInstence.post('/adminLogin', value, {
    withCredentials:true,
  });
};

const isAdminAuth = () => {
  return adminAxiosInstence.get("/adminAuth",
  {withCredentials:true});
};

export {
  adminLogin,
  isAdminAuth
};