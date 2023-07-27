import { userAxiosInstence } from "../utils/axios-utils";

const userLogin = (value) => {
  return userAxiosInstence.post('/login', value, {
    withCredentials:true
  })
}

const userSignup = (value) => {
  return userAxiosInstence.post('/register', value, {
    withCredentials:true
  })
}

const isUserAuth = () => {
  return userAxiosInstence.get("/userAuth", { withCredentials: true });
};

const forgotPassUser = (value) => {
  return userAxiosInstence.post('/forgotPass', value, {
    withCredentials:true
  })
}


export{
  userLogin,
  userSignup,
  isUserAuth,
  forgotPassUser
};