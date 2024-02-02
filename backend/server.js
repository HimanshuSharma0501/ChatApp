import express from "express";
import dotenv from "dotenv"; //to access dotenv file in root directory
import cookieParser from "cookie-parser";

//routes
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//database
import connectToDB from "./db/connectToDB.js";

//creation of server
const app = express();
dotenv.config(); //now we can use the dotenv file
app.use(express.json()); // to parse incoming request's json payload(from req.body)
app.use(cookieParser()); //for protectRoute Middleware

//defining port to be used for server
const PORT = process.env.PORT || 5000;

//using routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//starting server
app.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
