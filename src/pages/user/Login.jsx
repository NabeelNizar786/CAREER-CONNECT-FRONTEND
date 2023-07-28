import NavBar from "../../components/navBar";
import google from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { userLogin } from "../../services/userApi";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      userLogin({ ...values })
        .then((res) => {
          dispatch(hideLoading());
          localStorage.setItem("userJwt", res.data.token);
          if (res.data.login) {
            toast.success(res.data.message);
            navigate("/user/home");
          }
        })
        .catch((error) => {
          dispatch(hideLoading());
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("An error occured. Please try again");
    }
  };

  const optionStyle = {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "bold",
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-200 ">
        <div className="max-w-md w-full p-6 bg-blue-100 shadow-lg rounded-lg">
          <h1
            className="text-2xl font-bold text-center mb-6 whitespace-nowrap"
            style={optionStyle}
          >
            LOGIN TO FIND YOUR PASSION
          </h1>
          <h1
            className="text-3xl font-bold text-center mb-6 "
            style={optionStyle}
          >
            USER LOGIN
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                style={optionStyle}
                htmlFor="email"
                className="block font-bold"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:border-blue-500"
                name="email"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                placeholder="email"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <label
                style={optionStyle}
                htmlFor="password"
                className="block font-bold"
              >
                Password:
              </label>
              <Link
                to='/user/forgotPass'
                className="text-blue-500 underline hover:no-underline focus:no-underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:border-blue-500"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                placeholder="password"
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
          <div className="flex items-center justify-center mt-4">
            <hr className="w-full border-gray-300" />
            <span className="text-gray-500 mx-4">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="flex items-center justify-center mt-4">
            <img src={google} alt="Google Logo" className="h-6 mr-2" />
            <button className="bg-white text-gray-600 font-semibold py-2 px-4 rounded border border-gray-300 hover:bg-gray-100 focus:outline-none">
              Login with Google
            </button>
          </div>
          <p className="text-black-600 mt-6" style={optionStyle}>
            Don't have an account?
            <Link
              to="/user/register"
              className="text-blue-500 underline hover:no-underline focus:no-underline ml-2"
            >
            Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
