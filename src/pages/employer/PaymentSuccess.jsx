import React, {useEffect, useState} from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import { paymentVerification } from "../../services/EmpApi";
import { toast } from "react-hot-toast";
import { updateEmpDetails } from "../../redux/employer/EmpSlice";
import { useDispatch } from "react-redux";

export default function PaymentSuccess() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const params = useParams();
  const empId = params.empId;

  useEffect(() => {
    paymentVerification(empId)
    .then((res) => {
      dispatch(updateEmpDetails(res.data.empData));

      setUpdate(true);
    })
    .catch((err) => {
      navigate('/error');
      console.log(err);
    })
  },[]);

  if(!update) return;

  return(
    <div className="flex items-center mt-16  ">
    <div className="bg-white p-6 md:p-20 rounded-lg  md:mx-auto">
      <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Payment Done!
        </h3>
        <p className="text-gray-600 my-2">
          Thank you for becoming a premium member
        </p>
        <p> continue your journy </p>
        <div className="py-10 text-center">
          <Link to={"/employer/empHome"}>
            <button className="px-12 bg-indigo-900 rounded-md hover:bg-indigo-500 text-white font-semibold py-3">
              GO BACK
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
}