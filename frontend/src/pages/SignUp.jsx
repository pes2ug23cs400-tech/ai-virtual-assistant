import React from "react";
import bg from "../assets/authBg.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { set } from "mongoose";

function SignUp() {
  const navigate=useNavigate();
  const [name, setName] =useState(""); 
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const {serverUrl,userData,setUserData}=useContext(userDataContext);
  const [err, setErr] = useState("");
  
  const handleSignUp=async(e)=>{
    e.preventDefault();
    setErr("");
    setLoading(true);
    try{
      let result=await axios.post(`${serverUrl}/api/auth/signup`,{name,email,password},{withCredentials:true});
      console.log(result);
      setUserData(result?.data);
      setLoading(false);
     navigate("/customize");
    }catch(error){
       console.log(error);
       setLoading(false);
       setUserData(null);
       setErr(error.response.data.message);
    }
  }
  return (
    <div
      className="w-full h-[100vh] bg-cover items-center flex justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[550px] max-w-[500px] bg-[#00000069] backdrop-blur shadow-lg shadow-black
      flex flex-col justify-center items-center gap-[20px] px-[20px]"
     onSubmit={handleSignUp} >
        <h1 className="text-[30px] font-semibold text-white mb-[30px]">
          Register to{" "}
          <span className="text-blue-400 font-semibold">Virtual Assistant</span>
        </h1>
        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300
px-[20px] py-[10px] text-start rounded-full text-[18px]"
        required onChange={(e) => setName(e.target.value)} value={name}/>

        <input
          type="email"
          placeholder="Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300
px-[20px] py-[10px] text-start rounded-full text-[18px]"
        required onChange={(e) => setEmail(e.target.value)} value={email}/>
        <div className="w-full h-[60px] outline-none border-2  border-white bg-transparent text-white rounded-full text-[18px] ">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-full rounded-full outline-none border-white bg-transparent text-white placeholder-gray-300
px-[20px] py-[10px] text-start "
         required onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        {err.length > 0 && <p className="text-red-400">
          *{err}</p>}
      
        <button className="min-w-[8em] h-[2.7em] mt-[20px] text-black bg-white rounded-full font-semibold text-[18px]
        " disabled={loading} >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <p className="text-white text-[18px] cursor-pointer" onClick={() => navigate("/signin")}>Already have an account? <span className='text-blue-400'>Sign in.</span></p>
      </form>
    </div>
  );
}

export default SignUp;
