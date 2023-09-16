import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { empInviteUser, empCreateChat } from '../../../services/EmpApi';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function UserCard({ userData, postData, set}) {

  const empData = useSelector((state) => state.emp.empData);

  const navigate = useNavigate();

  const navigateToProfile = (id) => {
    navigate('/employer/applicants/profile', {state: {id}})
  }

  const invite = (userId, postId) => {
    empInviteUser({ userId, postId })
      .then((res) => {
        set(res.data.postData);
        toast.success("invited");
      })
      .catch((err) => {
        toast.error("internal server error");
        console.log(err);
      });
  };

  const newChat = (senderId, receiverId) => {
    empCreateChat({ senderId: senderId, receiverId: receiverId })
      .then((res) => {
        console.log(res.data);
        let data = res.data.chatData;
        console.log(data, "data avunindo");
        navigate("/employer/message", { state: { data } });
      })
      .catch((err) => {
        console.log(err);
        toast.error("something wend wrong");
      });
  };

  return (
    <div>
      {userData.map((user, i) => (
        <div
          key={i}
          className="bg-white mx-4 md:mx-28 mt-6 border border-gray-400 rounded-lg shadow-lg p-4 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="md:w-3/4">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
              {user.username.toUpperCase()}
            </h1>
            <p className="mt-2 text-gray-600">{user.about}</p>
            <div className="mt-2">
              <span className="text-lg font-medium text-gray-700">Skills: </span>
              {user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-500 text-white text-sm rounded-md px-2 py-1 ml-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 mt-4 md:mt-0 flex justify-center items-center space-x-4">
            <button
              onClick={() => navigateToProfile(user._id)}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold md:text-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Profile
            </button>
            <button
              onClick={() => newChat(empData._id, user._id)}
              className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold md:text-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Chat
            </button>
            {postData.invites.some((invite) => invite.userId === user._id) ? (
              <button className="bg-gray-500 text-white px-5 py-2 rounded-md font-semibold md:text-lg cursor-not-allowed">
                Invited
              </button>
            ) : (
              <button
                onClick={() => invite(user._id, postData._id)}
                className="bg-green-500 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold md:text-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Invite
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}