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

const userGetAllPost = () => {
  return userAxiosInstence.get('/getAllPost', {
    withCredentials:true
  })
}

const userGetCityDetails = () => {
  return userAxiosInstence.get("/cityDetails", { withCredentials: true });
};
const userGetSkillsData = () => {
  return userAxiosInstence.get("/skillData", { withCredentials: true });
};

const jobDetailedView = (id) => {
  return userAxiosInstence.get(`/jobDetailedView/${id}`, {
    withCredentials:true
  })
}

const applyJob = (data) => {
  return userAxiosInstence.post('/applyJob', data, {
    withCredentials:true
  })
}

const changeUserImage = (data) => {
  return userAxiosInstence.post('/changeUserImage', data, {
    withCredentials:true
  })
}

const updateUserAbout = (data) => {
  return userAxiosInstence.post('/updateUserAbout', data, {
    withCredentials:true
  })
}

const updateUserBasicInfo = (data) => {
  return userAxiosInstence.post('/updateUserBasicInfo', data, {
    withCredentials:true
  })
}

const addUserExp = (data) => {
  return userAxiosInstence.post("/addUserExp", data, { withCredentials: true });
};

const addUserEdu = (data) => {
  return userAxiosInstence.post("/addUserEdu", data, { withCredentials: true });
};

const dropUserEdu = (data) => {
  return userAxiosInstence.post("/dropUserEdu", data, {
    withCredentials: true,
  });
};

const dropUserExp = (data) => {
  return userAxiosInstence.post("/dropUserExp", data, {
    withCredentials: true,
  });
};

const addUserSkill = (data) => {
  return userAxiosInstence.post("/addUserSkill", data, {
    withCredentials: true,
  });
};
const dropUserSkill = (data) => {
  return userAxiosInstence.post("/dropUserSkill", data, {
    withCredentials: true,
  });
};

const changeUserPassword = (data) => {
  return userAxiosInstence.post("/changeUserPassword", data, {
    withCredentials: true,
  });
};


export{
  userLogin,
  userSignup,
  userLoginWithGoogle,
  isUserAuth,
  forgotPassUser,
  userGetAllPost,
  userGetCityDetails,
  userGetSkillsData,
  jobDetailedView,
  applyJob,
  changeUserImage,
  updateUserAbout,
  updateUserBasicInfo,
  addUserExp,
  addUserEdu,
  dropUserEdu,
  dropUserExp,
  addUserSkill,
  dropUserSkill,
  changeUserPassword
};