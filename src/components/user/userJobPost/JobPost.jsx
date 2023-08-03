import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobPost({posts}) {

  const navigate = useNavigate();

  const navigateToProfile = (id) => {
    navigate("/user/employer/profile",{state:{id}});
  };

  return (
    <>
    <div className="">
      {posts.map((post, index) => (
        <div
          key={index}
          className="bg-white md:mx-24 border  grid md:grid-cols-2 m-3 md:p-4 p-3 shadow-xl border-gray-400 rounded-xl"
        >
          <div className="flex flex-col">
            <div className="my-1">
              <span className="md:text-3xl text-stone-950 font-bold">
                Role : {post.role}
              </span>
            </div>
            <div className="my-1">
              <span onClick={() => navigateToProfile (post.empId._id)} className="md:text-2xl text-blue-600 cursor-pointer hover:text-blue-800 font-bold">
                <span className="text-black cursor-default">Company :</span>{" "}
                {post.empId.companyName}
              </span>
            </div>
            <div className="my-1">
              <span className="md:text-2xl  font-bold">
                Location : {post.location}
              </span>
            </div>
            <div className="my-1">
              <span className="md:text-2xl  font-bold">
                Total vacancy : {post.vacancy}
              </span>
            </div>
            <div className="my-1">
              <span className="md:text-xl  font-bold">
                Required skills:
                {post.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-400 ms-1 rounded-md text-white font-medium text-base px-1"
                  >
                    {" "}
                    {skill}
                  </span>
                ))}
                {post.additionalSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-400 ms-1 rounded-md text-white font-medium text-base px-1"
                  >
                    {" "}
                    {skill}
                  </span>
                ))}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex md:justify-end">
              {/* <ViewDetailsButton id={post._id}/> */}
            </div>
            <div className="flex md:justify-end mt-auto me-9 ">
              <span className="md:text-xl font-bold">
                Status :<span className="text-green-500">{post.status}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
}