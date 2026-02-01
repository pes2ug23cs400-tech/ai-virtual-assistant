import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  // Must be called before accessing process.env

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Database connected: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // exit the app if DB fails to connect
  }
};

export default connectDb;
