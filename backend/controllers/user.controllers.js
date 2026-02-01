import { response } from "express";
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import User from "../models/user.model.js";
import moment from "moment";
import { get } from "mongoose";

export const getCurrentUser = async (req, res) => {
    try{
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if(!user) return res.status(400).json({message: "User does not exist"});
        return res.status(200).json(user);
        
    } catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const updateAssistant=async (req,res)=>{
    try{
        const {assistantName,imageUrl}=req.body;
        let assistantImage;
        if(req.file){
            assistantImage=await uploadOnCloudinary(req.file.path)
        }else{
            assistantImage=imageUrl
        }
        const user=await User.findByIdAndUpdate(req.userId,{assistantName,assistantImage},
            {name:true}
        ).select("-password");
        if(!user) return res.status(400).json({message: "User does not exist"});
        return res.status(200).json(user);
    }
    catch(error){
      console.log(error)
    }
}


export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const userName = user.name;
    const assistantName = user.assistantName;

    const result = await geminiResponse(command, assistantName, userName);
    const jsonMatch = result?.match(/{[\s\S]*}/);

    if (!jsonMatch) return res.status(400).json({ message: "Invalid JSON" });

    const gemResult = JSON.parse(jsonMatch[0]);
    const type = gemResult.type;
    const userInput = gemResult.userInput;

    switch (type) {
      case 'get_date':
        return res.json({
          type,
          userInput,
          response: `Current date is ${moment().format("YYYY-MM-DD")}`,
        });

      case 'get_time':
        return res.json({
          type,
          userInput,
          response: `Current time is ${moment().format("hh:mm A")}`,
        });

      case 'get_day':
        return res.json({
          type,
          userInput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case 'get_month':
        return res.json({
          type,
          userInput,
          response: `Current month is ${moment().format("MMMM")}`,
        });

      case 'general':
      case 'music_open':
      case 'settings_open':
      case 'instagram_open':
      case 'facebook_open':
      case 'whatsapp_open':
      case 'email_open':
      case 'maps_open':
      case 'call_someone':
      case 'message_someone':
      case 'weather_show':
      case 'news_show':
      case 'calculator':
      case 'google_search':
      case 'youtube_search':
      case 'youtube_play':
      case 'wikipedia_search':
      case 'wikipedia_play':
      case 'google_play':
      case 'calculator_open':
      case 'window_shutdown':
        return res.json({
          type,
          userInput,
          response: gemResult.response,
        });

      default:
        return res.status(400).json({ response: "I didn't understand the command" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
