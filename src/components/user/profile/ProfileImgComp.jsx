import React, { useState } from "react";
import img from "../../../assets/employee.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faPerson
} from "@fortawesome/free-solid-svg-icons";
import { changeUserImage } from "../../../services/userApi";
import {updateUserDetails} from '../../../redux/user/userSlice';
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

export default function ProPicComp({userData}) {

  const dispatch = useDispatch();

  const handleImageChange = (event) => {

    const image = event.target.files[0];
    if(!image) {
      toast.error("Please select an image");
    }

    const formData = new FormData();

    formData.append('image', image);
    changeUserImage(formData).then((res) => {
      toast.success('UPDATED SUCCESSFULLY');
      dispatch(updateUserDetails(res.data.userData));

    }).catch((err) => {
      console.log(err);
      toast.error("SOMETHING WENT WRONG!");
    })
  };

  return (
    <div className="bg-blue-200 border  flex flex-col  mb-3 lg:mx-8 p-6 rounded-xl shadow-md border-gray-500">
      <div className="relative flex flex-col justify-center  mx-auto mb-4">
        <div className="">
          <img
            src={`${userData.image == null ? img : userData.image}`}
            alt="Current Profile Image"
            className="rounded-full w-44 h-44"
          />
        </div>
        <input
          onChange={handleImageChange}
          type="file"
          id="new-image"
          className="hidden"
        />
        <label
          htmlFor="new-image"
          className="px-8 py-2 absolute  top-36 mt-8  bg-white font-bold cursor-pointer "
        >
          Update Image
        </label>
      </div>
      <div className="my-2 flex over justify-center">
        <h1 className="text-2xl  font-extrabold"> {userData.name}</h1>
      </div>
      <div className=" my-2">
        <h1 className="text-lg flex font-medium">
          {" "}
          <FontAwesomeIcon className="me-3" color="" icon={faPerson} />{" "}
          {userData.username.toUpperCase()}
        </h1>
      </div>
      <div className=" my-2">
        <h1 className="text-md flex font-medium" >
          {" "}
          <FontAwesomeIcon className="me-3" color="" icon={faEnvelope} />{" "}
          {userData.email}
        </h1>
      </div>
      <div className=" my-2">
        <h1 className="text-lg font-medium">
          {" "}
          <FontAwesomeIcon className="me-3" color="black" icon={faPhone} />{" "}
          {userData.phone ? userData.phone : "phone number not added"}
        </h1>
      </div>
      <div className=" my-2">
        <h1 className="text-lg font-medium">
          {" "}
          <FontAwesomeIcon
            className="me-4"
            color=""
            icon={faLocationDot}
          />{" "}
          {userData.location ? userData.location : "location  not added"}
        </h1>
      </div>
    </div>
  );
}