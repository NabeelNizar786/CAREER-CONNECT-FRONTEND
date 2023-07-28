import { userAxiosInstence } from "../utils/axios-utils";

const userLogin = (value) => {
  return userAxiosInstence.post('/login', value, {
    withCredentials:true
  })
}

const userLoginWithGoogle = (value) => {
  return userAxiosInstence.post('/googleLogin', value, {
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
  return userAxiosInstence.patch('/forgotPass', value, {
    withCredentials:true
  })
}


export{
  userLogin,
  userSignup,
  userLoginWithGoogle,
  isUserAuth,
  forgotPassUser
};