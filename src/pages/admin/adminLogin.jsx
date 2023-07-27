import React,{useState} from 'react';
import {HiOutlineUserCircle} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import { adminLogin } from '../../services/adminApi';


const AdminLogin = () => {

  const [values,setValues] = useState({
    email:"",
    password:""
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      
      let {email,password} = values
      console.log(email,password);

      if(email.trim()==""){
        return toast.error("EMAIL SHOULD NOT BE EMPTY");
      } else if (password.trim()=== ""){
        return toast.error("PASSWORD SHOULD NOT BE EMPTY");
      }

      dispatch(showLoading());

      adminLogin({...values})
      .then((res) => {
        dispatch(hideLoading())
        console.log(res.data);
        localStorage.setItem("adminJwt", res.data.token);
        if(res.data.login){
          toast.success(res.data.message);
          navigate('/admin/adminHome')
        }
      }).catch((error) => {

        dispatch(hideLoading())
        toast.error(error.response.data.message)
      })

    } catch (error) {
      console.log(error.message);
    }
  }
  const optionStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
  }

  return (
    <div>
  <div className="flex items-center justify-center min-h-screen bg-gray-200 ">
    <div className="max-w-md w-full p-6 bg-blue-100 shadow-lg rounded-lg">
    <div className="flex items-center justify-center mb-4">
          <HiOutlineUserCircle className="text-9xl text-blue-500" />
        </div>
      <h1 className="text-3xl font-bold text-center mb-6 "style={optionStyle}>ADMIN LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label style={optionStyle} htmlFor="email" className="block font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:border-blue-500"
            name="email"
            onChange={(e) => setValues({...values,[e.target.name]: e.target.value})}
            placeholder='email'
            required
          />
        </div>
        <div className="mb-6">
          <label style={optionStyle} htmlFor="password" className="block font-bold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:border-blue-500"
            name='password'
            onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
            placeholder='password'
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
  );
};


export default AdminLogin;
