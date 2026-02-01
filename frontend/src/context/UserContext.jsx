import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';



// Create context
export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = 'http://localhost:8000';
  
  const [userData, setUserData] = useState(null);
  const [frontendImage,setFrontendImage]=useState(null)
      const [backendImage,setBackendImage]=useState(null)
      const [selectedImage, setSelectedImage] = useState(null);

  // const handleCurrentUser = async () => {
  //   try {
  //     const result = await axios.get(`${serverUrl}/api/user/current`, {
  //       withCredentials: true,
  //     }); 
      
  //   console.log("my user data", result?.data);
  //   setUserData(result?.data);
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleCurrentUser = async () => {
  try {
    const result = await axios.get(`${serverUrl}/api/user/current`, {
      withCredentials: true,
    }); 

    if (result?.headers['content-type'].includes('application/json')) {
      //console.log("my user data", result?.data);
      setUserData(result?.data);
    } else {
      console.warn("Received non-JSON response", result.data);
    }

  } catch (error) {
    console.error("Error fetching current user", error);
  }
};

const getGeminiResponse = async (command) => {
  try {
    const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, { command },{withCredentials: true});
   // return result?.data?.candidates[0].content.parts[0].text;
   return result?.data
  } catch (error) {
    // Just throw the error — let the route handle it
    throw new Error(error.message);
  }
};


  useEffect(() => {
   // console.log("Calling handleCurrentUser");

    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    handleCurrentUser,
    getGeminiResponse
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
