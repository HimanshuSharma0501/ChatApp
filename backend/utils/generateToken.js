import jwt from "jsonwebtoken";
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //to make 15d in ms
    httpOnly: true, //prevent XSS(cross site scripting) Attacks
    sameSite: "strict", //prevent CSRF(CROSS SITE REQUEST FORGERY ATTACKS)
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
