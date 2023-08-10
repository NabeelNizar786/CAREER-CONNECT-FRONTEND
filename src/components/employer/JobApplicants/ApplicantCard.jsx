import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faDownload } from "@fortawesome/free-solid-svg-icons";
import UserProfileButton from "../UserProfileButton";
import { useSelector } from "react-redux";
import { changeApplicationStatus } from "../../../services/EmpApi";
import {showLoading, hideLoading} from '../../../redux/alertsSlice';
import { useDispatch } from "react-redux";
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


const openResume = (resumeUrl) => {
  window.open(resumeUrl, "_blank");
}
const downloadResume = (resumeUrl) => {
  fetch(resumeUrl)
  .then((response) => response.blob())
  .then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "resume.pdf";
    link.click();
  })
  .catch((error) => {
    console.error("Error occurred while downloading the resume:", error);
});

}

let textColor;

export default function ApplicantCard({postData, status, set}) {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const empData = useSelector((state) => state.emp.empData);

  const filteredApplicants = postData.applicants.filter(
    (applicant) => applicant.status === status
  );

  if (status === "Pending") {
    textColor = "orange-600";
  } else if (status === "Selected") {
    textColor = "green-500";
  } else if (status === "Rejected") {
    textColor = "red-600";
  }

  const changeStatus = (id, userId, newStatus) => {

    dispatch(showLoading());
    changeApplicationStatus(postData._id, id, newStatus, userId)
    .then((res) => {
      dispatch(hideLoading());

      set(res.data.postData);

      toast.success(newStatus);
    })
    .catch((err) => {
      console.log(err);
      dispatch(hideLoading());
      toast.error("something went wrong");
    });
  }

  return (
    <>
      {filteredApplicants.length !== 0 ? (
        filteredApplicants.map((post, i) => (
          <div
            key={i}
            className="bg-white md:mx-24 border mb-3 m-1 md:p-4 p-3 shadow-xl border-gray-400 rounded-lg"
          >
            <div className="flex flex-wrap">
              <div className="w-full md:w-2/3">
                <h1 className="text-xl font-bold md:text-2xl mb-2 uppercase">
                  {post.applicant.username}
                </h1>
                <div className="flex space-x-2 items-center">
                  <UserProfileButton id={post.applicant._id} />
                  <button
                    onClick={() => newChat(empData._id, post.applicant._id)}
                    className="bg-blue-950 text-white rounded-lg font-semibold py-1 px-4"
                  >
                    CHAT
                  </button>
                </div>
                <div className="mt-2">
                  <span className="font-bold md:text-xl">Cover Letter:</span>
                  <span className="font-serif md:text-xl block">
                    {post.coverLetter}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold text-lg">
                    Application status:
                  </span>
                  <span className={`font-bold text-lg text-${textColor}`}>
                    {post.status}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-bold text-xl">Resume:</span>
                  <div className="flex space-x-2 mt-1">
                    <button onClick={() => openResume(post.resumeUrl)}>
                      <FontAwesomeIcon
                        className="font-bold text-xl text-blue-600 rounded-lg"
                        icon={faEye}
                      />
                    </button>
                    <button onClick={() => downloadResume(post.resumeUrl)}>
                      <FontAwesomeIcon
                        className="font-bold text-xl text-blue-800 rounded-lg"
                        icon={faDownload}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 mt-4 md:mt-0">
                <div className="flex justify-end">
                  {status !== "Selected" && (
                    <button
                      onClick={() =>
                        changeStatus(post._id, post.applicant._id, "Selected")
                      }
                      className="bg-green-700 text-white md:text-lg rounded-lg font-bold py-1 px-4 me-2"
                    >
                      SELECT
                    </button>
                  )}
                  {status !== "Rejected" && (
                    <button
                      onClick={() =>
                        changeStatus(post._id, post.applicant._id, "Rejected")
                      }
                      className="bg-red-800 text-white md:text-lg rounded-lg font-bold py-1 px-4"
                    >
                      REJECT
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="h-56 flex items-center justify-center">
          <h1 className="md:text-4xl font-serif font-bold">
            No {status} Applicants Found
          </h1>
        </div>
      )}
    </>
  );
  
  
}