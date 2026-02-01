// import React from "react";

// function Card({ image }) {
//   return (
//     <div className="w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff62] rounded-2xl hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white">
//       <img
//         src={image}
//         alt="preview"
//         className="h-full object-cover rounded-2xl overflow-hidden"
//       />
//     </div>
//   );
// }

// export default Card;
import React from "react";
import { userDataContext } from "../context/userContext";
import { useContext } from "react";

function Card({ image }) {
    const { serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage}=useContext(userDataContext)
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff62] rounded-2xl 
    hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white 
    flex items-center justify-center overflow-hidden ${selectedImage===image? "border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={()=>{setSelectedImage(image)
        setBackendImage(null)
        setFrontendImage(null)
    }}>
      <img src={image} alt="assistant" className="h-full w-full object-cover rounded-2xl" />
    </div>
  );
}

export default Card;
