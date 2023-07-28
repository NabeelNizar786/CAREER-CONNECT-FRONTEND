import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  // Assuming you have a user object or name to display
  const [user, setUser] = useState({ name: 'USER' }); // Replace 'John Doe' with your actual user's name

  useEffect(() => {
    // Fetch user data from an API or perform any other necessary data fetching here
    // Example: axios.get('/api/user').then(response => setUser(response.data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto">
          <ul className="flex items-center justify-between">
            <li>
              <a href="#" className="text-white text-lg font-bold">
                Your Logo
              </a>
            </li>
            <li>
              {/* Add more menu items as needed */}
              <a href="#" className="text-white mx-4">
                Home
              </a>
              <a href="#" className="text-white mx-4">
                About
              </a>
              <a href="#" className="text-white mx-4">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome, {user.name}</h1>
        <p className="text-lg">
          Your beautiful content goes here...
        </p>
      </div>
    </div>
  );
}

export default Home;
