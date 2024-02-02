import mongoose from "mongoose";
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MONGO DB");
  } catch (error) {
    console.log(`error connecting to Database`, error.message);
  }
};
export default connectToDB;
