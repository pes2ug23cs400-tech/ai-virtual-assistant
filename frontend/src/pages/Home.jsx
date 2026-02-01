// import React from 'react'
// import { useContext } from 'react'
// import { userDataContext } from '../context/userContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import { useRef } from 'react'
// import { set } from 'mongoose'

// function Home() {
//     const {userData,serverUrl,setUserData,getGeminiResponse}=useContext(userDataContext)
//     const navigate=useNavigate()
//     const [listening,setListening]=useState(false)
//     const isSpeakingRef=useRef(false)
//     const recognitionRef=useRef(null)
//     const synth=window.speechSynthesis

//     const handleLogout=async()=>{
//         try{
//             const result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
//             setUserData(null)
//             navigate("/signin")
//             console.log("logout done")
//         }catch(error){
//             console.log(error);
//         }
//     }

//     const startRecognition=()=>{
//         try{
//         recognitionRef.current.start();
//         setListening(true)
//     }catch(error){
//         if(!error.massage.includes("started")){
//             console.log("Recognition error",error);
//         }
//     }}

//     const speak=(text)=>{
//       const utterence= new SpeechSynthesisUtterance(text); 
//       isSpeakingRef.current=true
//       utterence.onend=()=>{
//         isSpeakingRef.current=false
// startRecognition()
//       }
//       synth.speak(utterence);   
//     }

//   const handleCommand = (data) => {
//   const { type, userInput, response } = data;
//   console.log(data);

//   switch (type) {
//     case 'google_search':
//       window.open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`, '_blank');
//       break;
//     case 'youtube_search':
//     case 'youtube_play':
//       window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`, '_blank');
//       break;
//     case 'calculator_open':
//       window.open('https://www.calculator.net/', '_blank');
//       break;
//     case 'instagram_open':
//       window.open('https://www.instagram.com/', '_blank');
//       break;
//     case 'facebook_open':
//       window.open('https://www.facebook.com/', '_blank');
//       break;
//     case 'whatsapp_open':
//       window.open('https://web.whatsapp.com/', '_blank');
//       break;
//     case 'email_open':
//       window.open('https://mail.google.com/', '_blank');
//       break;
//     case 'maps_open':
//       window.open('https://www.google.com/maps/', '_blank');
//       break;
//     case 'call_someone':
//       window.open(`tel:${userInput}`, '_blank');
//       break;
//     case 'message_someone':
//       window.open(`https://web.whatsapp.com/send?phone=${userInput}`, '_blank');
//       break;
//     case 'weather_show':
//       window.open(`https://www.google.com/search?q=weather+${encodeURIComponent(userInput)}`, '_blank');
//       break;
//     case 'news_show':
//       window.open('https://www.google.com/search?q=news', '_blank');
//       break;
//     case 'music_open':
//       window.open('https://www.google.com/search?q=music', '_blank');
//       break;
//     case 'settings_open':
//       window.open('https://www.google.com/search?q=settings', '_blank');
//       break;
//     default:
//       console.warn("Unknown command type:", type);
//   }

//   // Optional: Speak the response
//   speak(response);
// };

// useEffect(()=>{
//     const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition=new SpeechRecognition();
//     recognition.continuous=true;
//     recognition.lang="en-US";

//     recognitionRef.current=recognition

//     const isRecognizingRef={current: false};

//     const safeRecognition=async()=>{
//        if(!isSpeakingRef.current && !isRecognizingRef.current){
//            try{
//                recognition.start();
//                console.log("recognition requested to start");
//            }catch(err){
//                if(err.name !=="InvalidStateError"){
//                    alert("Please allow access to your microphone in your browser settings.",err);
//                }
//            }
//        }
//     }

//     recognition.onstart=()=>{
//         console.log("recognition started");
//         isRecognizingRef.current=true;
//         setListening(true);
//     }

//     recognition.onend=()=>{
//         console.log("recognition ended");
//         isRecognizingRef.current=false;
//         setListening(false);
     
//         if(!isSpeakingRef.current){
//        setTimeout(()=>{
//            safeRecognition();
//        },1000)
//     }
// }

// recognition.onerror=(event)=>{
//     console.warn("Recognition error",event.error);
//     isRecognizingRef.current=false;
//     setListening(false);
//     if(event.error!=="aborted" && !isSpeakingRef.current){
//         setTimeout(()=>{
//             safeRecognition();
//         },1000)
//     }
// }

   

//     recognition.onresult=async(e)=>{
//        const transcript= e.results[0][0].transcript.trim();
//        console.log(transcript);
//        if(transcript?.toLowerCase()?.includes(userData?.assistantName?.toLowerCase())){
//         recognition.stop();
//         isRecognizingRef.current=false;
//         setListening(false);
//         const data= await getGeminiResponse(transcript)
//         console.log(data);
//         //speak(data?.response);
//         handleCommand(data);
//        }
//     }
//    // recognition.start();
//     const fallback=setInterval(()=>{
//         if(!isSpeakingRef.current && !isRecognizingRef.current){
//             safeRecognition();
//         }
//     },10000)
//     safeRecognition();

//     return ()=>{
//         recognition.stop();
//         setListening(false);
//         isRecognizingRef.current=false;
//         clearInterval(fallback);
//     }
// },[])

//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center 
//     flex-col items-center  gap-[15px]">
//         <button className="min-w-[100px] h-[40px] mt-[10px] text-black bg-white absolute top-[20px] right-[20px] rounded-full font-semibold text-[18px]
//        corsor-pointer " onClick={handleLogout} >Log Out    
//         </button>
//         <button className="min-w-[100px] h-[50px] mt-[5px] text-black bg-white absolute 
//         top-[100px] right-[19px] px-[20px] py-[10px] rounded-full font-semibold text-[18px]
//         corsor-pointer " onClick={()=>navigate("/customize")} >Customize Your Assistant   
//         </button>
//        <div className='w-[300px] h-[400px] flex justify-center items-center 
//        overflow-hidden rounded-4xl shadow-2xl shadow-blue-950'>
//        <img src={userData?.assistantImage} alt="assistant" className="h-full w-full object-cover " />
//        </div>
//        <h1 className='text-white text-2xl md:text-3xl font-semibold text-center mb-8'>Welcome , I'm <span className='text-blue-200'>{userData?.assistantName}</span></h1>
//     </div>
//   )
// }

// export default Home

// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { userDataContext } from '../context/userContext';
// import aiImg from '../assets/ai.gif';
// import userImg from '../assets/user.gif'

// function Home() {
//   const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
//   const navigate = useNavigate();
//   const [listening, setListening] = useState(false);
//   const [userText, setUserText] = useState('');
//   const [aiText, setAIText] = useState('');

//   const isSpeakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const isRecognizingRef = useRef(false);
//   const synth = window.speechSynthesis;
  

//   const handleLogout = async () => {
//     try {
//       await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
//       setUserData(null);
//       navigate("/signin");
//       console.log("logout done");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//      utterance.lang='hi-IN';
//      const voices=window.speechSynthesis.getVoices()
//      const hindiVoice=voices.find(v => v.lang === 'hi-IN' &&
//       /female|woman|Shruti|Asha|Google हिन्दी/.test(v.name.toLowerCase()));

//     if (hindiVoice) {
//       utterance.voice = hindiVoice;
//     }

//     isSpeakingRef.current = true;
//     utterance.onend = () => {
//       isSpeakingRef.current = false;
//       startRecognition();
//     };
//     synth.speak(utterance);
//   };

//   const speak = (text) => {
//   const synth = window.speechSynthesis;
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = 'hi-IN';

//   const setVoiceAndSpeak = () => {
//     const voices = synth.getVoices();

//     // Try to get a female Hindi voice by name pattern
//     const hindiVoice = voices.find(v =>
//       v.lang === 'hi-IN' &&
//       /female|woman|shruti|asha|google हिन्दी/.test(v.name.toLowerCase())
//     ) || voices.find(v => v.lang === 'hi-IN'); // fallback to any Hindi voice

//     if (hindiVoice) {
//       utterance.voice = hindiVoice;
//     } else {
//       console.warn("Hindi voice not found. Using default voice.");
//     }

//     // Optional: stop any ongoing speech before speaking
//     synth.cancel();

//     isSpeakingRef.current = true;

//     utterance.onend = () => {
//       isSpeakingRef.current = false;
//       startRecognition();
//     };

//     synth.speak(utterance);
//   };

//   // If voices already loaded
//   if (synth.getVoices().length > 0) {
//     setVoiceAndSpeak();
//   } else {
//     // Wait for voices to be loaded
//     synth.onvoiceschanged = setVoiceAndSpeak;
//   }
// };


//   const handleCommand = (data) => {
//     const { type, userInput, response } = data;
//     console.log("Response:", data);

//     const encoded = encodeURIComponent(userInput);

//     switch (type) {
//       case 'google_search':
//         window.open(`https://www.google.com/search?q=${encoded}`, '_blank');
//         break;
//       case 'youtube_search':
//       case 'youtube_play':
//         window.open(`https://www.youtube.com/results?search_query=${encoded}`, '_blank');
//         break;
//       case 'calculator_open':
//         window.open('https://www.calculator.net/', '_blank');
//         break;
//       case 'instagram_open':
//         window.open('https://www.instagram.com/', '_blank');
//         break;
//       case 'facebook_open':
//         window.open('https://www.facebook.com/', '_blank');
//         break;
//       case 'whatsapp_open':
//         window.open('https://web.whatsapp.com/', '_blank');
//         break;
//       case 'email_open':
//         window.open('https://mail.google.com/', '_blank');
//         break;
//       case 'maps_open':
//         window.open('https://www.google.com/maps/', '_blank');
//         break;
//       case 'call_someone':
//         window.open(`tel:${userInput}`, '_blank');
//         break;
//       case 'message_someone':
//         window.open(`https://web.whatsapp.com/send?phone=${userInput}`, '_blank');
//         break;
//       case 'weather_show':
//         window.open(`https://www.google.com/search?q=weather+${encoded}`, '_blank');
//         break;
//       case 'news_show':
//         window.open('https://www.google.com/search?q=news', '_blank');
//         break;
//       case 'music_open':
//         window.open('https://www.google.com/search?q=music', '_blank');
//         break;
//       case 'settings_open':
//         window.open('https://www.google.com/search?q=settings', '_blank');
//         break;
//       case 'window_shutdown':
//         window.close();
//         break;
//       default:
//         console.warn("Unknown command type:", type);
//     }

//     speak(response);
//   };

//   const startRecognition = () => {
//     if (!isSpeakingRef.current && !isRecognizingRef.current) {
//       try {
//         recognitionRef.current.start();
//         console.log("Recognition started");
//       } catch (error) {
//         if (!error.message.includes("already started")) {
//           console.error("Recognition error:", error);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang = "en-US";
//     recognitionRef.current = recognition;

//     recognition.onstart = () => {
//       isRecognizingRef.current = true;
//       setListening(true);
//     };

//     recognition.onend = () => {
//       isRecognizingRef.current = false;
//       setListening(false);
//       if (!isSpeakingRef.current) {
//         setTimeout(() => startRecognition(), 1000);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.warn("Recognition error:", event.error);
//       isRecognizingRef.current = false;
//       setListening(false);
//       if (event.error !== "aborted" && !isSpeakingRef.current) {
//         setTimeout(() => startRecognition(), 1000);
//       }
//     };

//     recognition.onresult = async (e) => {
//       const transcript = e.results[0][0].transcript.trim();
//       console.log("Heard:", transcript);

//       if (transcript.toLowerCase().includes(userData?.assistantName?.toLowerCase())) {
//         setAIText("")
//         setUserText(transcript)
//         recognition.stop();
//         isRecognizingRef.current = false;
//         setListening(false);
//         const data = await getGeminiResponse(transcript);
//         if (data) handleCommand(data);
//         setAIText(data?.response)
//         setUserText("")
//       }
//     };

//     const fallback = setInterval(() => {
//       if (!isSpeakingRef.current && !isRecognizingRef.current) {
//         startRecognition();
//       }
//     }, 10000);

//     startRecognition();

//     return () => {
//       recognition.stop();
//       setListening(false);
//       isRecognizingRef.current = false;
//       clearInterval(fallback);
//     };
//   }, []);

//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center flex-col items-center gap-[15px]">
//       <button
//         className="min-w-[100px] h-[40px] mt-[10px] text-black bg-white absolute top-[20px] right-[20px] rounded-full font-semibold text-[18px] cursor-pointer"
//         onClick={handleLogout}
//       >
//         Log Out
//       </button>
//       <button
//         className="min-w-[100px] h-[50px] mt-[5px] text-black bg-white absolute top-[100px] right-[19px] px-[20px] py-[10px] rounded-full font-semibold text-[18px] cursor-pointer"
//         onClick={() => navigate("/customize")}
//       >
//         Customize Your Assistant
//       </button>
//       <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-2xl shadow-blue-950">
//         <img src={userData?.assistantImage} alt="assistant" className="h-full w-full object-cover" />
//       </div>
//       <h1 className="text-white text-2xl md:text-3xl font-semibold text-center mb-8">
//         Welcome, I'm <span className="text-blue-200">{userData?.assistantName}</span>
//       </h1>
//       {!aiText && <img src={userImg} alt="user" className="w-[200px] object-cover " />}
//       {aiText && <img src={aiImg} alt="ai" className="w-[100px] object-cover" />}
//       <p className="text-white text-center">{aiText}hello</p>
//     </div>
//   );
// }

// export default Home;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/userContext';
import aiImg from '../assets/ai.gif';
import userImg from '../assets/user.gif';
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState('');
  const [aiText, setAIText] = useState('');

  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const synth = window.speechSynthesis;
  const cachedVoicesRef = useRef([]);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const loadVoices = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) cachedVoicesRef.current = voices;
    };
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';

    const voices = cachedVoicesRef.current;
    const hindiVoice = voices.find(v =>
      v.lang === 'hi-IN' &&
      /female|shruti|asha|woman|google हिन्दी/.test(v.name.toLowerCase())
    ) || voices.find(v => v.lang === 'hi-IN');

    if (hindiVoice) utterance.voice = hindiVoice;

    isSpeakingRef.current = true;

    utterance.onend = () => {
      isSpeakingRef.current = false;
       setAIText(''); 
       startRecognition();
    };

    synth.cancel();
    synth.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    const encoded = encodeURIComponent(userInput || "");

    switch (type) {
      case 'google_search':
        window.open(`https://www.google.com/search?q=${encoded}`, '_blank');
        break;
      case 'youtube_search':
      case 'youtube_play':
        window.open(`https://www.youtube.com/results?search_query=${encoded}`, '_blank');
        break;
      case 'calculator_open':
        window.open('https://www.calculator.net/', '_blank');
        break;
      case 'instagram_open':
        window.open('https://www.instagram.com/', '_blank');
        break;
      case 'facebook_open':
        window.open('https://www.facebook.com/', '_blank');
        break;
      case 'whatsapp_open':
        window.open('https://web.whatsapp.com/', '_blank');
        break;
      case 'email_open':
        window.open('https://mail.google.com/', '_blank');
        break;
      case 'maps_open':
        window.open('https://www.google.com/maps/', '_blank');
        break;
      case 'call_someone':
        window.open(`tel:${userInput}`, '_blank');
        break;
      case 'message_someone':
        window.open(`https://web.whatsapp.com/send?phone=${userInput}`, '_blank');
        break;
      case 'weather_show':
        window.open(`https://www.google.com/search?q=weather+${encoded}`, '_blank');
        break;
      case 'news_show':
        window.open('https://www.google.com/search?q=news', '_blank');
        break;
      case 'music_open':
        window.open('https://www.google.com/search?q=music', '_blank');
        break;
      case 'settings_open':
        window.open('https://www.google.com/search?q=settings', '_blank');
        break;
      case 'window_shutdown':
        window.close(); // Browser restrictions apply
        break;
      default:
        console.warn("Unknown command type:", type);
    }

    speak(response);
  };

  const startRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        if (!error.message.includes("already started")) {
          console.error("Recognition error:", error);
        }
      }
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
       
      setListening(false);
      if (!isSpeakingRef.current) {
        setTimeout(() => startRecognition(), 300); // reduced delay
      }
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (event.error !== "aborted" && !isSpeakingRef.current) {
        setTimeout(() => startRecognition(), 300);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      if (transcript.toLowerCase().includes(userData?.assistantName?.toLowerCase())) {
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);
        setUserText(transcript);
        const data = await getGeminiResponse(transcript);
        if (data) {
          handleCommand(data);
          setAIText(data.response || '');
        }
        setUserText('');
      }
    };

    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        startRecognition();
      }
    }, 10000);

    startRecognition();

    return () => {
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
      clearInterval(fallback);
    };
  }, []);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center flex-col items-center gap-[15px]">
      <CgMenuRight  className='lg:hidden text-white absolute top-[10px] right-[20px] w-[25px] h-[25px]'/>
      {/* <div className="absolute inset-0 bg-[#00000053] backdrop-blur-lg flex flex-col items-center justify-center gap-6">
  <RxCross1
    className="text-white absolute top-[10px] right-[20px] w-[25px] h-[25px] cursor-pointer"
    
  />
  
  <button
    className="min-w-[150px] h-[45px] text-black bg-white rounded-full font-semibold text-[16px] px- shadow-md"
    onClick={handleLogout}
  >
    Log Out
  </button>
  
  <button
    className="min-w-[200px] h-[50px] text-black bg-white rounded-full font-semibold text-[16px] px-4 shadow-md"
    onClick={() => navigate("/customize")}
  >
    Customize your Assistant
  </button>
</div> */}

  <div className='absolute top-0 w-full h-full bg-[#00000053] backdrop-blur-lg p-[20px]'>
        <RxCross1  className=' text-white absolute top-[10px] right-[20px] w-[25px] h-[25px]'/> 
         <button
        className="min-w-[100px] h-[40px] mt-[10px] text-black bg-white  rounded-full font-semibold text-[18px] cursor-pointer"
        onClick={handleLogout}
      >
        Log Out
      </button>
      <button
        className="min-w-[100px] h-[50px] mt-[30px] text-black bg-white  top-[100px] left-[19px] px-[20px] py-[10px] rounded-full font-semibold text-[18px] cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize Your Assistant
      </button>
      </div>

      
      <button
        className="min-w-[100px] h-[40px] mt-[10px] text-black bg-white absolute hidden lg:block top-[20px] right-[20px] rounded-full font-semibold text-[18px] cursor-pointer"
        onClick={handleLogout}
      >
        Log Out
      </button>
      <button
        className="min-w-[100px] h-[50px] mt-[5px] text-black bg-white absolute hidden lg:block  top-[100px] right-[19px] px-[20px] py-[10px] rounded-full font-semibold text-[18px] cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize Your Assistant
      </button>
      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-2xl shadow-blue-950">
        <img src={userData?.assistantImage} alt="assistant" className="h-full w-full object-cover" />
      </div>
      <h1 className="text-white text-2xl md:text-3xl font-semibold text-center mb-8">
        Welcome, I'm <span className="text-blue-200">{userData?.assistantName}</span>
      </h1>
      {!aiText && <img src={userImg} alt="user" className="w-[200px] object-cover " />}
      {aiText && <img src={aiImg} alt="ai" className="w-[100px] object-cover" />}
      <p className="text-white text-center">{aiText || ''}</p>
    </div>
  );
}

export default Home;
