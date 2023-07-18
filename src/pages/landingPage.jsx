import {React, useState, useEffect} from 'react';
import logo from '../assets/R.png';
import centreImage from '../assets/young-man-working-office_85869-7416.webp'
import centreImage2 from '../assets/centre2.jpeg'
import centreImage3 from '../assets/centre3.jpg'
import apply from '../assets/APPLY.png'
import recruit from '../assets/FIND.png'
import meet from '../assets/employee-clipart-satisfied-employee-1.png'
import employee from '../assets/employee.png'
import employer from '../assets/EMPLOYER.png'
import { Link } from 'react-router-dom';


const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [centreImage, centreImage2, centreImage3]; // Replace with your image URLs
  const interval = 3000; // Interval in milliseconds (e.g., 3000 = 3 seconds)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images.length, interval]);

  const textStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    fontSize: '2rem',
    marginBottom: '1rem',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
  };

  const dreamStyle = {
    color: 'blue',
  };

  const headingStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    marginBottom: '1rem',
  };

  const subHeadingStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    marginBottom: '1rem',
  };

  const optionStyle = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
  };

  return (
    <div className="bg-gradient-to-b from-blue-400 via-white to-blue-400 min-h-screen relative">
      <div className="absolute top-0 left-0 ml-4 mt-4">
        <img src={logo} alt="Logo" className="h-16" />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="mt-6" style={textStyle}>
          WELCOME TO CAREERCONNECT.COM
        </h1>
      </div>
      <div className="absolute right-8">
        <img
          src={images[currentImage]}
          alt="Center Image"
          className="w-full max-w-lg"
        />
      </div>
      <div className="mt-28 ml-6">
        <h1 className="ml-2" style={headingStyle}>
          FIND YOUR <span style={dreamStyle}>DREAM</span> JOB
        </h1>
        <h1 className="mt-0 ml-2 text-left" style={subHeadingStyle}>
          WITH YOUR INTEREST AND SKILLS!
        </h1>
      </div>
      <div className="mt-28 flex justify-center">
        <div className="flex">
          <div className="mr-16">
            <img
              id="image1"
              src={apply}
              alt="Image 1"
              className="w-60 h-60 object-cover"
            />
            <button
              className="py-2 px-4 text-center bg-blue-500 text-white rounded-lg"
              style={optionStyle}
            >
              APPLY EASILY
            </button>
          </div>
          <div className="mr-16">
            <img
              id="image2"
              src={recruit}
              alt="Image 2"
              className="w-60 h-60 object-cover"
            />
            <button
              className="py-2 px-4 text-center bg-green-500 text-white rounded-lg"
              style={optionStyle}
            >
              FIND EASILY
            </button>
          </div>
          <div>
            <img
              id="image3"
              src={meet}
              alt="Image 3"
              className="w-60 h-60 object-cover"
            />
            <button
              className="py-2 px-4 text-center bg-red-500 text-white rounded-lg"
              style={optionStyle}
            >
              MEET EASILY
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-center text-2xl font-bold mb-4">CHOOSE AN OPTION</h2>
        <div className="flex justify-center">
          <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center mb-6 hover:bg-blue-100">
              <img src={employee} alt="Employee" className="w-48 h-48 mb-4" />
              <h3 className="text-xl font-bold mb-2">IF YOU'RE AN EMPLOYEE</h3>
              <p className="text-gray-600 text-center">
                Click here to explore job opportunities and find your dream job.
              </p>
              <Link to='/login' className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
                CLICK HERE
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center mb-6 hover:bg-blue-100">
              <img src={employer} alt="Employer" className="w-48 h-48 mb-4" />
              <h3 className="text-xl font-bold mb-2">IF YOU'RE AN EMPLOYER</h3>
              <p className="text-gray-600 text-center">
                Click here to post job openings and find talented individuals for your company.
              </p>
              <Link to='/employerLogin' className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
                CLICK HERE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
