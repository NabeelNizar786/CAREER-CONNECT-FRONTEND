import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { APP_ID, SERVER_SECRET } from '../constants/constants';
import NavBar from '../components/navBar';
import { useState } from 'react';
import toast from 'react-hot-toast';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {

  const roomPass = "1234";

  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {

    setIsModalOpen(false);
  };

  const handlePasswordSubmit = (enteredPassword) => {
    // Store the enteredPassword in your state or perform any required actions
    // For example:
    if(enteredPassword === roomPass) {
      closeModal();
    } else {
      toast.error("INCORRECT ROOM PASSWORD")
    }
  };
  

  const roomID = "Careerconnect"
  let myMeeting = async (element) => {

 // generate Kit Token
 const appID = APP_ID;
 const serverSecret = SERVER_SECRET;
 const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  "ENTER YOUR NAME");

 // Create instance object from Kit Token.
 const zp = ZegoUIKitPrebuilt.create(kitToken);
 // start the call
 zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
         mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
   });
  };

  const isAuthenticated = true;

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      {isModalOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Enter Room Password</h2>
            <input
              className="w-full px-3 py-2 border rounded-md mb-2"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => handlePasswordSubmit(password)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="myCallContainer"
          ref={myMeeting}
          style={{ width: '100vw', height: '100vh' }}
        ></div>
      )}
    </>
  );
  
  
}