// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import Customize from "./pages/Customize";
// import Home from "./pages/Home";
// import { useContext } from "react";
// import { userDataContext } from "./context/userContext";
// import Customize2 from "./pages/Customize2";

// function App() {  
//   const {userData,setUserData}=useContext(userDataContext);
//   return (
//     <Routes>
  
//       <Route path="/" element={(userData?.assistantImage && userData?.assistantName)?<Home/>:<Navigate to="/customize" />} ></Route>
//       <Route path="/signup" element={!userData?<SignUp/>:<Navigate to="/customize" />} ></Route>
//       <Route path="/signin" element={!userData?<SignIn/>:<Navigate to="/" />} ></Route>      <Route path="/signin" element={<SignIn/>} ></Route>
//       <Route path="/customize" element={userData?<Customize/>:<Navigate to="/signup" />} ></Route>
//       <Route path="/customize2" element={userData?<Customize2/>:<Navigate to="/signup" />} ></Route>
//     </Routes>
//   );
// }

// export default App;

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Customize from "./pages/Customize";
import Home from "./pages/Home";
import { useContext } from "react";
import { userDataContext } from "./context/userContext";
import Customize2 from "./pages/Customize2";

function App() {  
  const {userData,setUserData}=useContext(userDataContext);
//console.log("Assistant name", userData?.assistantName);



  return (
    <Routes>
  
      <Route path="/" element={(userData?.assistantImage && userData?.assistantName )? <Home/>:<Navigate to="/customize" />} ></Route>
      <Route path="/signup" element={!userData?<SignUp/>:<Navigate to="/" />} ></Route>
      <Route path="/signin" element={!userData?<SignIn/>:<Navigate to="/" />} ></Route>     
      <Route path="/customize" element={userData?<Customize/>:<Navigate to="/signup" />} ></Route>
      <Route path="/customize2" element={userData?<Customize2/>:<Navigate to="/signup" />} ></Route>
    </Routes>
  );
}

export default App;


// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import Customize from "./pages/Customize";
// import Home from "./pages/Home";
// import { useContext } from "react";
// import { userDataContext } from "./context/userContext";
// import Customize2 from "./pages/Customize2";
// function App() {
//   const { userData, setUserData } = useContext(userDataContext);
//   console.log("user data", userData?.assistantName);
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           userData?.assistantImage && userData?.assistantName
//             ? <Home />
//             : <Navigate to="/customize" />
//         }
//       />
//       <Route
//         path="/signup"
//         element={
//           !userData
//             ? <SignUp />
//             : <Navigate to="/" />
//         }
//       />
//       <Route
//         path="/signin"
//         element={
//           !userData
//             ? <SignIn />
//             : <Navigate to="/" />
//         }
//       />
//       <Route
//         path="/customize"
//         element={
//           userData
//             ? <Customize />
//             : <Navigate to="/signup" />
//         }
//       />
//       <Route
//         path="/customize2"
//         element={
//           userData
//             ? <Customize2 />
//             : <Navigate to="/signup" />
//         }
//       />
//     </Routes>
//   );
// }

// export default App;