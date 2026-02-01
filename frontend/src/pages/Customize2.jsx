// import React from 'react'
// import { useContext } from 'react'
// import { useState } from 'react'
// import { userDataContext } from '../context/userContext'
// import axios from 'axios'
// import { IoArrowBack } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom'

// function Customize2() {
//     const {userData,backendImage,selectedImage,serverUrl,setUserData}=useContext(userDataContext)
//     const [assistantName,setAssistantName]=useState(userData?.assistantName || "")
//     const [loading,setLoading]=useState(false)
//     const navigate=useNavigate()
//     const handleUpdateAssistant= async()=>{
//         try{
//             let formData=new FormData()
//             formData.append("assistantName",assistantName)
//             if(backendImage){
//                 formData.append("assistantImage",backendImage)
//             }else{
//                 formData.append("imageUrl",selectedImage)
//             }
//             const result=await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
//             console.log(result?.data)
//             setUserData(result?.data)
//         }
//         catch(error){
//             console.log(error)
//         }
//     }

//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-t
//      from-black to-[#030353] flex justify-center flex-col items-center px-4 py-10 relative">
//         <IoArrowBack className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]' onClick={()=>navigate("/customize")}/>
//         <h1 className="text-white text-2xl md:text-3xl font-semibold text-center mb-8" >Enter Yoaur <span className="text-blue-200">Assistant Name</span></h1>
//         <input
//           type="text"
//           placeholder="eg. Seeri"
//           className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300
// px-[20px] py-[10px] text-start rounded-full text-[18px]"
//         required  onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}/>
//         {assistantName && <div className="mt-10">
//         <button className="min-w-[8em] px-6 py-2 bg-white text-black 
//         rounded-full font-semibold text-lg hover:bg-gray-200 transition cursor-pointer"
//         disabled={loading} onClick={()=>
//             handleUpdateAssistant()
//         }>
//           {!loading?"Finaly Create Your Assistant":"Loading..." }
//         </button>
//       </div>}
        
//      </div>
//   )
// }

// export default Customize2

import React, { useContext, useState } from 'react';
import { userDataContext } from '../context/userContext';
import axios from 'axios';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Customize2() {
  const {
    userData,
    backendImage,
    selectedImage,
    serverUrl,
    setUserData
  } = useContext(userDataContext);

  const [assistantName, setAssistantName] = useState(userData?.assistantName  || "");
  console.log("assistant name",userData?.assistantName);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

//   const handleUpdateAssistant = async () => {
//     if (!assistantName) return;
//     setLoading(true);

//     try {
//       let formData = new FormData();
//       formData.append("assistantName", assistantName);
//       console.log(formData?.assistantName);

//       if (backendImage) {
//         formData.append("assistantImage", backendImage);
//       } else {
//         formData.append("imageUrl", selectedImage);
//       }

//       const result = await axios.post(
//         `${serverUrl}/api/user/update`,
//         formData,
//         { withCredentials: true }
//       );

//       console.log("Updated:", result?.data);
//       setUserData(result?.data);
//       navigate("/"); // ✅ redirect to Home
//     } catch (error) {
//       console.error("Error updating assistant:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
const handleUpdateAssistant = async () => {
  if (!assistantName) return;
  setLoading(true);

  try {
    let formData = new FormData();
    formData.append("assistantName", assistantName);

    if (backendImage) {
      formData.append("assistantImage", backendImage);
    } else {
      formData.append("imageUrl", selectedImage);
    }

    const result = await axios.post(
      `${serverUrl}/api/user/update`,
      formData,
      { withCredentials: true }
    );
setLoading(false);
    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    console.log("Response:", result?.data);
    setUserData(result?.data);

    // ✅ Manually merge assistant info into context
    setUserData((prev) => ({
      ...prev,
      assistantImage: selectedImage || backendImage,
      assistantName: assistantName,
    }));

    navigate("/");
  } catch (error) {
    console.error("Error updating assistant:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] 
    flex justify-center flex-col items-center px-4 py-10 relative">
      <IoArrowBack
        className="absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]"
        onClick={() => navigate("/customize")}
      />

      <h1 className="text-white text-2xl md:text-3xl font-semibold text-center mb-8">
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>

      <input
        type="text"
        placeholder="e.g. Seeri"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent 
        text-white placeholder-gray-300 px-[20px] py-[10px] text-start rounded-full text-[18px]"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />

      {assistantName && (
        <div className="mt-10">
          <button
            className="min-w-[8em] px-6 py-2 bg-white text-black 
            rounded-full font-semibold text-lg hover:bg-gray-200 transition cursor-pointer"
            disabled={loading}
            onClick={handleUpdateAssistant}
          >
            {loading ? "Loading..." : "Finally Create Your Assistant"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Customize2;
