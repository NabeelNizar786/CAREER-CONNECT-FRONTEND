import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { APP_ID, SERVER_SECRET } from '../constants/constants';
import NavBar from '../components/navBar';

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
    <NavBar isAuthenticated={isAuthenticated}/>
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
    </>
  );
}