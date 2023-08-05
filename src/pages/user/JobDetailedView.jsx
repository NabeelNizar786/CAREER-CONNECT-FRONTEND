import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { jobDetailedView } from '../../services/userApi';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ApplyJobModal from '../../components/user/userJobPost/ApplyJobModal';
import NavBar from '../../components/navBar';


export default function PostDetailedView() {
  const userData = useSelector((state) => state.user.userData)
  const dispatch = useDispatch();
  const [postDetails, setPostDetails] = useState({});
  const location = useLocation();
  const {id} = location.state || {};

  const isAuthenticated = true;

  useEffect(() => {
    dispatch(showLoading());
    jobDetailedView(id)
    .then((res) => {
      dispatch(hideLoading())
      setPostDetails(res.data.postData);
    })
    .catch((err) => {
      dispatch(hideLoading());
    })
  },[]);

  if(Object.keys(postDetails).length === 0) return;

  return (
    <>
    <NavBar isAuthenticated={isAuthenticated} />
    <div className="bg-blue-200 flex justify-center items-center h-screen">
      <div className="bg-white text-gray-900 border border-gray-300  shadow-2xl my-20 lg:my-28 lg:m-52  md:m-14">
        <div className="md:flex md:flex-wrap  p-6">
          <div className="md:w-4/6  ">
            <div>
              <h1 className="font-extrabold  text-blue-950  text-xl md:text-4xl ps-3 ">
                Role : {postDetails.role}{" "}
              </h1>
            </div>
            <div className="font-bold md:text-2xl ps-3 py-1">
              <h2>
                Company :{" "}
                <span className=" hover:text-blue-600 text-blue-900">
                  {postDetails.empId.companyName}
                </span>{" "}
              </h2>
            </div>
            <div className="font-bold md:text-2xl ps-3 py-1">
              <h2>Location: {postDetails.location}</h2>
            </div>
            <div className="font-bold md:text-2xl ps-3 py-1">
              <h2>CTC : {postDetails.ctc}</h2>
            </div>
            <div className="font-bold md:text-2xl ps-3 py-1">
              <h2>job type : {postDetails.jobtype}</h2>
            </div>
            <div className="font-bold md:text-2xl ps-3 py-1">
              <h2>Total Vacancy : {postDetails.vacancy}</h2>
            </div>
            <div className="font-bold md:text-2xl ps-3 py-1">
              <h2>Minimum Experiance : {postDetails.minimumExp} years</h2>
            </div>
            <div className="font-bold md:text-2xl ps-3 py-1">
              <h2>
                Required Skill :{" "}
                {postDetails.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-sm bg-gray-700 text-gray-200 p-1 rounded-lg m-1"
                  >
                    {skill}
                  </span>
                ))}
                {postDetails.additionalSkills ? (
                  postDetails.additionalSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-sm bg-gray-700 text-gray-200 p-1 rounded-lg m-1"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <div></div>
                )}
              </h2>
            </div>
            <div className="font-bold md:text-2xl ps-3 py-1">
              <h2>
                Status :{" "}
                <span className="text-sm bg-green-400 text-white p-1 px-2 rounded-lg m-1">
                  {postDetails.status}
                </span>
              </h2>
            </div>
            <div className="font-bold md:text-2xl ps-3  py-1">
              <h2>
                Job Description :{" "}
                <span className="md:text-lg text-sm font-medium">
                  {postDetails.jobDescription}
                </span>
              </h2>
            </div>
          </div>
          <div className="md:w-2/6 flex flex-row justify-center  ">
            {postDetails.applicants && Array.isArray(postDetails.applicants) && postDetails.applicants.some(
              (applicant) => applicant.applicant === userData._id
            ) ? (
              <div>
                <button className="font-bold bg-blue-950 text-white md:text-xl rounded-lg flex mx-auto md:p-3 p-1 md:px-3">
                  ALREADY APPLIED
                </button>
              </div>
            ) : (
              <ApplyJobModal set={setPostDetails} id={postDetails._id} />
            )}
            <div className="">
              {/* <ReportModal postId={postDetails._id} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );

}