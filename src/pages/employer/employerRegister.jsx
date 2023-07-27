import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { empSignUp } from '../../services/EmpApi';
import { auth } from '../../firebase/firebase';
import { RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth';

const EmployerRegister = () => {

  const [values, setValues] = useState({companyName:"", email:"", phone:"", password:"" });
  const [otpValue, setOtpValue] = useState("");
  const [clicked, setClicked] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async() => {
    try {
      dispatch(showLoading());
      empSignUp({...values})
      .then((res) => {
        dispatch(hideLoading());

        if(res.data.created) {
          toast.success(res.data.message);
          navigate('/employer/emplogin');
        } else if (res.data.exists) {
          toast.error("ACCOUNT ALREADY ACCESS!")
        }
      })
      .catch((error) => {
        dispatch(hideLoading());

        console.log(error.message);
        toast.error(error.message);
      })
    } catch (error) {
      dispatch(hideLoading())

      console.error(error);
      toast.error("AN ERROR OCCURED. PLEASE TRY AGAIN");
    }
  };

  const onCaptchaVerify = () => {
    if(!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          toast("OTP SENDED SUCCESSFULLY!");
          sendOtp();
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
      );
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    onCaptchaVerify();

    const phoneNumber = "+91" + values.phone;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setClicked(false);
    }).catch((error) => {
      toast.error(error.message);
    });
  };

  const otpVerify = () => {
    const otpNumber = otpValue;
    window.confirmationResult
    .confirm(otpNumber)
    .then(async () => {
      handleSubmit();
    })
    .catch(() => {
      toast.error("ENTER A VALID OTP");
    });
  }

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    {clicked? (
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <div id="recaptcha-container"></div>
      <h1 className="text-4xl font-bold text-center mb-8">WELCOME ONBOARD</h1>
      <h2 className="text-xl text-center mb-6">SIGN UP TO MAKE THE FIRST STEP</h2>
        <form onSubmit={sendOtp}>
        <div className="mb-6">
            <label htmlFor="username" className="block font-bold mb-2">
              COMPANYNAME:
            </label>
            <input
              type="text"
              name='companyName'
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              EMAIL:
            </label>
            <input
              type="email"
              id="email"
              name='email'
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="mobilenumber" className="block font-bold mb-2">
              MOBILE NUMBER:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-bold mb-2">
              PASSWORD:
            </label>
            <input
              type="password"
              id="password"
              name='password'
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              onChange={(e) => setValues({...values, [e.target.name]: e.target.value})}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              SIGNUP
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="emp/login" className="text-blue-500">Login</Link>
      </p>
      </div>

  ):(
    <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-32">
        <h1 className="font-sans text-center font-black text-indigo-500 text-3xl">
          CAREER CONNECT || SIGNUP
        </h1>
        <p className="text-sm font-semibold text-center"></p>
      </div>

      <div className="relative mt-10 w-80">
        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
          OTP
        </p>
        <input
          placeholder="123456"
          value={otpValue}
          onChange={(e) => setOtpValue(e.target.value)}
          name="otp"
          type="text"
          className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-10 text-base block bg-white border-gray-300 rounded-md"
        />

        <div className="relative mt-2">
          <button
            className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease hover:cursor-pointer"
            onClick={otpVerify}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
                </>
              )}
            </div>
      </>
  );
};

export default EmployerRegister;

