import { useEffect, useState } from "react";
import ApplicantCard from "../../components/employer/JobApplicants/ApplicantCard";
import Categories from "../../components/employer/JobApplicants/Categories";
import { useLocation, useNavigate } from "react-router-dom";
import { getSinglePostData } from "../../services/EmpApi";
import { showLoading,hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";

export default function JobApplicants() {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const [status, setStatus] = useState("Pending");
  const location = useLocation();
  const {postId} = location.state || {};

  useEffect(() => {
    dispatch(showLoading());
    getSinglePostData(postId)
      .then((res) => {
        dispatch(hideLoading());
        setPostData(res.data.postData);
        console.log(res.data.postData);
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  }, [status]);

  const navigateToFindTalent = (id) => {
    navigate('/employer/post/FindTalent', {state: {id}});
  };

  if(postData.length === 0) return null;

  return (
    <div>
      <div className="bg-blue-200 min-h-screen">
        <div className="flex">
          <button
            onClick={() => navigateToFindTalent(postData._id)}
            className="bg-blue-950 ms-auto md:me-24 me-5 text-white md:text-2xl font-bold px-3 py-2 mt-3"
          >
            Find Talent
          </button>
        </div>
        <Categories set={setStatus} status={status} />
        {postData.applicants.length !== 0 ? (
          <div >
            <ApplicantCard
              postData={postData}
              status={status}
              set={setPostData}
            />
          </div>
        ) : (
          <div className="flex justify-center mt-20">
            <h1 className="text-3xl font-bold">
              You Don't Have Any Applications
            </h1>
          </div>
        )}
      </div>
      </div>
  );
}