import React, { useState, useEffect } from 'react';
import logo from '../assets/R.png';
import centreImage from '../assets/young-man-working-office_85869-7416.webp';
import centreImage2 from '../assets/centre2.jpeg';
import centreImage3 from '../assets/centre3.jpg';
import apply from '../assets/APPLY.png';
import recruit from '../assets/FIND.png';
import meet from '../assets/employee-clipart-satisfied-employee-1.png';
import employee from '../assets/employee.png';
import employer from '../assets/EMPLOYER.png';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [centreImage, centreImage2, centreImage3];
  const interval = 3000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images.length, interval]);

  return (
    <div className="bg-gradient-to-b from-blue-400 via-white to-blue-400 min-h-screen flex flex-col items-center justify-center py-2">
      <img src={logo} alt="Logo" className="h-16 mt-4" />
      <div className="text-center mt-6">
        <h1 className="text-2xl font-bold bg-white p-2 rounded">
          WELCOME TO CAREERCONNECT.COM
        </h1>
      </div>
      <img
        src={images[currentImage]}
        alt="Center Image"
        className="w-full max-w-lg mt-6"
      />
      <div className="mt-6 text-center">
        <h1 className="text-3xl font-bold">
          FIND YOUR <span className="text-blue-600">DREAM</span> JOB
        </h1>
        <h1 className="text-xl mt-2">
          WITH YOUR INTEREST AND SKILLS!
        </h1>
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        <div className="mr-4">
          <img
            id="image1"
            src={apply}
            alt="Image 1"
            className="w-32 h-32 object-cover"
          />
          <button className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg">
            APPLY EASILY
          </button>
        </div>
        <div className="mr-4">
          <img
            id="image2"
            src={recruit}
            alt="Image 2"
            className="w-32 h-32 object-cover"
          />
          <button className="mt-2 py-2 px-4 bg-green-500 text-white rounded-lg">
            FIND EASILY
          </button>
        </div>
        <div>
          <img
            id="image3"
            src={meet}
            alt="Image 3"
            className="w-32 h-32 object-cover"
          />
          <button className="mt-2 py-2 px-4 bg-red-500 text-white rounded-lg">
            MEET EASILY
          </button>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">CHOOSE AN OPTION</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 hover:bg-blue-100">
            <img src={employee} alt="Employee" className="w-48 h-48 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">IF YOU'RE AN EMPLOYEE</h3>
            <p className="text-gray-600">
              Click here to explore job opportunities and find your dream job.
            </p>
            <Link to='/user/login' className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 mx-auto">
              CLICK HERE
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:bg-blue-100">
            <img src={employer} alt="Employer" className="w-48 h-48 mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">IF YOU'RE AN EMPLOYER</h3>
            <p className="text-gray-600">
              Click here to post job openings and find talented individuals for your company.
            </p>
            <Link to='/employer/empLogin' className="block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 mx-auto">
              CLICK HERE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
