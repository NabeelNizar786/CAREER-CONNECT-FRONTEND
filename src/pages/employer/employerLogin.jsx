import React from "react";
import { useState } from "react";
import NavBar from "../../components/navBar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { empLogin } from "../../services/EmpApi";

function EmployerLogin() {
  const [values, setValues] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      empLogin({ ...values })
        .then((res) => {
          dispatch(hideLoading());
          if (res.data.login) {
            localStorage.setItem("empJwt", res.data.token);
            navigate("/employer/empHome");
            toast.success(res.data.message);
          }
        })
        .catch((error) => {
          dispatch(hideLoading());
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      toast.error("AN ERROR OCCURED. PLEASE TRY AGAIN");
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
            WELCOME BACK
          </h1>
          <h1
            className="text-3xl font-bold text-center mb-6 "
            style={optionStyle}
          >
            FIND THE PERFECT FIT FOR YOUR COMPANY'S SUCCESS!
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
                to="/employer/forgotPass"
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
          <p className="text-black-600 mt-6" style={optionStyle}>
            Don't have an account?
            <Link
              to="employer/empRegister"
              style={{
                textDecoration: "underline",
                marginLeft: "10px",
                color: "rgba(0, 0, 255, 1.0)",
              }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployerLogin;
