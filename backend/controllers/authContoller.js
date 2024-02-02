import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password != confirmPassword) {
      return res.status(400).json({ error: "passwords do not match" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "username already exists" });
    }
    //hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy`;
    const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl`;
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //Generate JWT here
      generateTokenAndSetCookie(newUser._id, res);
      //to save new user
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("error in signup", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Username or Password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error in login", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};