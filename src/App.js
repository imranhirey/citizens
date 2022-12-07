import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AgoraRTC from "agora-rtc-sdk-ng"
import { useEffect, useState } from 'react';
let options = 
{
    // Pass your App ID here.
    appId: '0c3d29a79f1b446bad8e130af871b945',
    // Set the channel name.
    channel: 'imran',
    // Pass your temp token here.
    token: '007eJxTYJj5XWTP8Vgzqy338pgmHDPQNeLQfLuubuO8o5URUdt28uxVYDBINk4xskw0t0wzTDIxMUtKTLFINTQ2SEyzMDdMsjQxbb7an9wQyMhwROotIyMDBIL4rAyZuUWJeQwMAIBRIHc=',
    // Set the user ID.
    uid: 0,
};

let channelParameters =
{
  // A variable to hold a local audio track.
  localAudioTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
    // A variable to hold the remote user id.
  remoteUid: null,
};

function App() {
  let [agoraEngine, setAgoraEngine] = useState(null)
    useEffect(()=>{
        let init = async () => {
            let client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});
            setAgoraEngine(client)

        
        }
        init()

    },[])
    console.log(agoraEngine)
  let call = async()=>{
  try {
    await agoraEngine.join(options.appId, options.channel, options.token, options.uid);
    channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Publish the local audio track in the channel.
    await agoraEngine.publish(channelParameters.localAudioTrack);
    console.log("publish success");    
   
  } catch (error) {
    console.log("error", error.message);
    
  }

  }
  return (
    <div className="App">
     <button onClick={()=>{
        call()

     }}>
      wac policeka
     </button>
    </div>
  );
}

export default App;
