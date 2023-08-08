import { empAxiosInstance } from "../utils/axios-utils";

const empSignUp = (value) => {
  return empAxiosInstance.post('/register',value,{
    withCredentials:true
  })
}

const empLogin = (value) => {
  return empAxiosInstance.post('/login', value, {
    withCredentials:true
  })
}

const empLoginWithGoogle = (value) => {
  return empAxiosInstance.post('/googleLogin', value, {
    withCredentials:true
  })
}

const isEmpAuth=()=>{
  return empAxiosInstance.get("/empAuth", {withCredentials:true})
}

const forgotPassEmp = (value) => {
  return empAxiosInstance.patch('/forgotPass', value, {
    withCredentials:true
  })
}

const skillData = () => {
  return empAxiosInstance.get('/skillData', {
    withCredentials:true
  })
}

const cityData = () => {
  return empAxiosInstance.get('/cityData', {
    withCredentials:true
  })
}

const getActivePostData = () => {
  return empAxiosInstance.get('/getActivePostData', {
    withCredentials:true
  })
}

const getPostData = () => {
  return empAxiosInstance.get('/getPostData', {
    withCredentials:true
  })
}

const createPost = (values) => {
  return empAxiosInstance.post('/createPost', values, {
    withCredentials:true
  })
}

const empUpdateAbout = (value) => {
  return empAxiosInstance.post('/updateAbout', value, {
    withCredentials: true,
  });
};

const empChangeUserImage = (value) => {
  return empAxiosInstance.post('/changeImage', value, {
    withCredentials:true
  })
}

const empUpdateBasic = (value) => {
  return empAxiosInstance.post('/updateBasicInfo', value, {
    withCredentials:true
  })
}

export{
  isEmpAuth,
  empSignUp,
  empLogin,
  forgotPassEmp,
  empLoginWithGoogle,
  skillData,
  cityData,
  getActivePostData,
  getPostData,
  createPost,
  empUpdateAbout,
  empChangeUserImage,
  empUpdateBasic
}