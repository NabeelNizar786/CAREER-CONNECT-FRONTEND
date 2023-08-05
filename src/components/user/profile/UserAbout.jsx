import React from 'react';
import AboutModal from '../profileModal/AboutModal';

export default function UserAbout({userAbout,set}) {

  return (
    <div className="bg-white border border-gray-500 shadow-md rounded-xl ">
    <div className="p-4">
      <div className="flex">
        <span className="lg:text-3xl text-2xl font-semibold">ABOUT</span>
      <AboutModal userAbout={userAbout} />
       


      </div>
      <div className="mt-3">
        <span  className="text-lg font-serif fon">
          {" "}
          {userAbout}
        </span>
      </div>
    </div>
  </div>
  )

}