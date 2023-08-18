import { adminAxiosInstence } from "../utils/axios-utils";

const adminLogin = (value) => {
  return adminAxiosInstence.post('/adminLogin', value, {
    withCredentials:true,
  });
};

const adminUserDetails = () => {
  return adminAxiosInstence.get('/userDetails', {
    withCredentials:true
  })
}

const adminEmpDetails = () => {
  return adminAxiosInstence.get('/empDetails', {
    withCredentials:true
  })
}

const employerRequests = () => {
  return adminAxiosInstence.get('/empVerify', {
    withCredentials:true
  })
}

const employerVerify = (values) => {
  return adminAxiosInstence.patch('/verify', values, {
    withCredentials:true
  })
}

const adminCityDetails = () => {
  return adminAxiosInstence.get('/cityDetails', {
    withCredentials:true
  })
}

const adminAddCity = (value) => {
  return adminAxiosInstence.post('/addCity', value, {
    withCredentials:true
  })
}

const adminDropCity = (value) => {
  return adminAxiosInstence.post('/dropCity', value, {
    withCredentials:true
  })
};

const adminAddSkill = (value) => {
  return adminAxiosInstence.post("/addskill", value, { withCredentials: true });
};

const adminDropSkill = (value) => {
  return adminAxiosInstence.post('/dropSkill', value, {
    withCredentials:true
  })
};

const adminSkillDetails = () => {
  return adminAxiosInstence.get("/skillDetails", { withCredentials: true });
};

const isAdminAuth = () => {
  return adminAxiosInstence.get("/adminAuth",
  {withCredentials:true});
};

const changeUserStatus = (value) => {
  return adminAxiosInstence.post('/changeUserStatus', value, {
    withCredentials:true
  })
}

const changeEmpStatus = (value) => {
  return adminAxiosInstence.post('/changeEmpStatus', value, {
    withCredentials:true
  })
}

const getSubscriptionDetails = (value) => {
  return adminAxiosInstence.get('/subscriptionDetails', {
    withCredentials:true
  })
};

export {
  adminLogin,
  isAdminAuth,
  adminUserDetails,
  adminEmpDetails,
  employerRequests,
  employerVerify,
  adminCityDetails,
  adminAddCity,
  adminAddSkill,
  adminSkillDetails,
  changeUserStatus,
  changeEmpStatus,
  getSubscriptionDetails,
  adminDropCity,
  adminDropSkill
};