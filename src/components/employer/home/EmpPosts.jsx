import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";
import EditJob from './EditJob';

export default function EmpPosts({posts, skills,citys, setPosts}) {

  const navigate = useNavigate();

  const navigateToApplicants = (postId) => {
    navigate('/employer/jobApplicants',{state:{postId}});

  }

  return (
    <>
    {posts.length != 0 ? (
        posts.map((post, index) => (
          <div
            key={index}
            className="bg-white md:mx-14 border grid md:grid-cols-3 m-3 md:p-4 p-3 shadow-xl border-gray-400 rounded-xl"
          >
            <div className="md:col-span-2">
              <div className="flex flex-col">
                <div className="my-1">
                  <span className="md:text-3xl font-bold">
                    Role : {post.role}
                  </span>
                </div>
                <div className="my-1">
                  <span className="md:text-2xl text-blue-600  font-bold">
                    <span className="text-black">Company :</span>{" "}
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
                  </span>
                </div>
                <div className="my-1">
                  <span className="md:text-xl font-bold">
                    Status :
                    <span className="text-green-500">{post.status}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="flex flex-col">
                <div className="flex justify-end">
                  <button
                    onClick={() => navigateToApplicants(post._id)}
                    className="bg-blue-900 text-sm md:text-lg text-white px-2  md:px-5 font-bold rounded-md"
                  >
                    VIEW
                  </button>
                  <EditJob

                    post={post}
                    skills={skills}
                    citys={citys}
                    setPosts={setPosts}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </>
  );
}