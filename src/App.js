import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AgoraRTC from "agora-rtc-sdk-ng"
import { useEffect, useState } from 'react';
import {io} from "socket.io-client";

let socket=io("https://192.168.0.105:4000");


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

   
        
  let client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});   
   
  let call = async()=>{
  try {
    let res= await axios.post('https://192.168.0.105:4000/agents/connectmetoagent')
    console.log(res.data)
    await client.join('e203b70afce24812a2c1d405a9bdd3b9', 'test',res.data.token,res.data.uid);


    channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    client.publish([channelParameters.localAudioTrack])
    
   
  } catch (error) {
    console.log("error", error.message);
    
  }

  }
  socket.on('connectionaccepted', (data)=>{
    let randomid=Math.floor(Math.random()*1000000000)
    console.warn('i got signal from the contact center',data.daatada.token);
    client.join('e203b70afce24812a2c1d405a9bdd3b9', 'test',data.daatada.token,data.daatada.uid);
  
  })

  client.on('user-published', async (user, mediaType) => {
    console.warn('i got signal from the contact center');
    await client.subscribe(user, mediaType);
    console.log('subscribe success');
    if (mediaType === 'audio') {
      channelParameters.remoteAudioTrack = user.audioTrack;

      channelParameters.remoteUid = user.uid;
      channelParameters.remoteAudioTrack.play();
      
    }
  })  

  client.getRTCStats((stats)=>{
    console.warn('remote stats',stats)
  })
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
