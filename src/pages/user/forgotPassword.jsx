import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { forgotPassUser } from "../../services/userApi";


function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [values, setValues] = useState({ phone: "", password:"" });
  const [otpValue, setOtpValue] = useState("");
  const [clicked, setClicked] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    try {
      dispatch(showLoading());
      forgotPassUser({ ...values })
        .then((res) => {
          dispatch(hideLoading());
          if (res.data.success) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          dispatch(hideLoading());
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      dispatch(hideLoading());
      toast.error("AN ERROR OCURRED PLEASE.. PLEASE TRY AGAIN");
    }
  };

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            toast.success("Otp sended succesfully");
          },
          "expired-callback": () => {
            toast.error("TimeOut");
          },
        },
        auth
      );
    }
  };

  const handleUser = async (e) => {
    e.preventDefault();
    try {
      if (values.phone.length !== 10)
        return toast.error("ENTER A VALID NUMBER");
      dispatch(showLoading());
      forgotPassUser({ ...values })
        .then((res) => {
          dispatch(hideLoading());
          if (res.data.check) {
            toast.success("OTP SEND SUCCESSFULLY");
            sendOtp();
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          dispatch(hideLoading());
          toast.error(error.response.data.message);
        });
    } catch (error) {
      dispatch(hideLoading());
      toast.error("AN ERROR OCURRED PLEASE.. PLEASE TRY AGAIN");
    }
  };

  const sendOtp = async () => {

    onCaptchaVerify();

    const phoneNo = "+91" + values.phone;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNo, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setClicked(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const otpVerify = () => {
    if (otpValue.length === 6) {
      if (values.password.length < 4)
        return toast.error("Enter atleast 4 digit password");
      if (values.password !== confirmPassword)
        return toast.error("The entered passwords do not match");

      const otpNumber = otpValue;
      window.confirmationResult
        .confirm(otpNumber)
        .then(async () => {
          handleSubmit();
          toast.success("PASSWORD CHANGED SUCCESSFULLY");
          navigate('/user/login');
        })
        .catch(() => {
          toast.error("The entered otp do not match ");
        });
    } else {
      toast.error("Enter a valid otp ");
    }
  };

  return (
      <div className="min-h-screen bg-blue-200 flex items-center justify-center">
        <div id="recaptcha-container"></div>
        <div className="bg-white rounded-lg shadow p-8">
          {clicked ? (
            <div>
              <label htmlFor="phoneNumber" className="text-gray-700 font-semibold block">
                Enter your phone number:
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phone"
                value={values.phone}
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                className="border rounded px-3 py-2 mt-2 w-64 focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="flex items-center justify-center">
              <button
                onClick={handleUser}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
              >
                Continue
              </button>
            </div>
            </div>
          ) : (
            <div>
              <label htmlFor="otp" className="text-gray-700 font-semibold block mt-4">
                Enter the OTP sent to your phone:
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                className="border rounded px-3 py-2 mt-2 w-64 focus:outline-none focus:ring focus:border-blue-300"
              />
              <label htmlFor="password" className="text-gray-700 font-semibold mt-4 block">
                Enter your password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                className="border rounded px-3 py-2 mt-2 w-64 focus:outline-none focus:ring focus:border-blue-300"
              />
              <label htmlFor="confirmPassword" className="text-gray-700 font-semibold mt-4 block">
                Confirm your password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border rounded px-3 py-2 mt-2 w-64 focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                onClick={otpVerify}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>
    );
}

export default ForgotPassword;
