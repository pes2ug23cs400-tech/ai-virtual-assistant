// import mongoose from "mongoose";    

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     assistant: {
//        type: String,
//     },
//   assistantImage: {
//     type: String,
//   },
//   assistantName:{
//     type: String,
//         required: true,
//   },
//   history: {
//     type: Array,
//   }
// }, {
//     timestamps: true,
// });

// const User = mongoose.model("User", userSchema);

// export default User;

import mongoose from "mongoose";    

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  assistantName: {  // ✅ renamed from 'assistant' to 'assistantName'
    type: String,
  },
  assistantImage: {
    type: String,
  },
  history: {
    type: Array,
  }
}, {
  timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

export default User;
