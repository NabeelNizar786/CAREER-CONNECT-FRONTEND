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

const isEmpAuth=()=>{
  return empAxiosInstance.get("/empAuth", {withCredentials:true})
}

export{
  isEmpAuth,
  empSignUp,
  empLogin
}