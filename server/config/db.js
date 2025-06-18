import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const isConnected = await mongoose.connect(process.env.DB_URL);
    if (isConnected) {
      console.log("Connected to database");
      return true;
    } else {
      console.log("Unable to connect to the DB");
      return false;
    }
  } catch (err) {
    console.error("DB connection error");
  }
};

export default dbConnect; 