// import React from "react";
// import Card from "../components/Card";
// import image1 from "../assets/image1.png";
// import image2 from "../assets/image2.jpg";
// import image4 from "../assets/image4.png";
// import image5 from "../assets/image5.png";
// import image6 from "../assets/image6.jpeg";
// import image7 from "../assets/image7.jpeg";
// import authBg from "../assets/authBg.png";
// import { RiImageAddFill } from "react-icons/ri";

// function Customize() {
//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] 
//     flex justify-center items-center flex-col p-[20px] ">
//         <h1 className="text-white mb-[30px] text-[30px] text-center">Select Your <span className="text-blue-200">Assistant Image</span></h1>
//       <div className="w-full max-w-[900px] flex justify-center items-center 
//       flex-wrap gap-[15px]">
//         <Card image={image1}/>
//         <Card image={authBg}/>
//         <Card image={image2}/>
//         <Card image={image4}/>
//         <Card image={image5}/>
//         <Card image={image6}/>
//         <Card image={image7}/>
//         <div className="w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff62] rounded-2xl 
//         hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white
//         flex items-center justify-center">
//             <RiImageAddFill className="text-white w-[25px] h-[25px]"/>
//     </div>
    
//       </div>
   
//     </div>
//   );
// }

// export default Customize;


// src/pages/Customize.jsx
import React, { useContext } from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import authBg from "../assets/authBg.png";
import { RiImageAddFill } from "react-icons/ri";
import { useState } from "react";
import { useRef } from "react";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function Customize() {
    const { serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage}=useContext(userDataContext)
    const inputImage=useRef()
    const navigate=useNavigate()
    const handleImage=(e)=>{
        const file=e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

  return (
    <div className="min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center px-4 py-10">
         <IoArrowBack className='absolute top-[20px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]' onClick={()=>navigate("/")}/>
      <h1 className="text-white text-2xl md:text-3xl font-semibold text-center mb-8">
        Select Your <span className="text-blue-200">Assistant Image</span>
      </h1>

      <div className="w-full max-w-[1000px] flex flex-wrap justify-center gap-4">
        <Card image={image1} />
        <Card image={image4} />
        <Card image={image2} />
        <Card image={image5} />
        <Card image={authBg} />
        <Card image={image6} />
        <Card image={image7} />

        {/* Add button placeholder */}
        <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff62] rounded-2xl 
        hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white
        flex items-center justify-center ${selectedImage==="input"? "border-4 border-white shadow-2xl shadow-blue-950":null}`} 
        onClick={() => {inputImage.current.click()
            setSelectedImage("input")
        }} >
            {!frontendImage && <RiImageAddFill className="text-white w-6 h-6" />}
            {frontendImage && <img src={frontendImage} alt="preview" className="h-full w-full object-cover rounded-2xl" />}
         
        </div>
        <input type="file" accept="image/*" ref={inputImage} hidden onChange={handleImage}/>
      </div>


      {/* Centered "Next" button */}
      {selectedImage && <div className="mt-10">
        <button className="min-w-[8em] px-6 py-2 bg-white text-black 
        rounded-full font-semibold text-lg hover:bg-gray-200 transition cursor-pointer"
        onClick={()=>navigate("/customize2")}>
          Next
        </button>
      </div>}
      
    </div>
  );
}

export default Customize;
