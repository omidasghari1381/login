//usermodel
import user from "../models/user.js";
//bcrypt
import bcrypt from "bcrypt";
//jwt
import jwt from "jsonwebtoken"
//.env
import "dotenv/config";

async function lookFor(userId, password) {
  try {
    const User = await user.findOne({
      $or: [{ username: userId }, { email: userId }, { phone: userId }],
    });
    if (!User) {
      console.log("user not found");
      return { success: false, message: "user not found" };
    }

    const isPasswordCorrect = await bcrypt.compare(password, User.password);
    if (!isPasswordCorrect) {
       console.log("password in incorrect");
      return { success: false, message: "password in incorrect" };
    }
    const token = jwt.sign({ id: User._id }, process.env.PASSWORD_HASH_KEY, { expiresIn: "1h" });
    console.log("login succesfully");
    return { success: true, message: "login succesfully", token };
  } catch (error) {
    console.error(error);
    return { success: false, message: "login failed" };
  }
}

async function checkUser(req, res) {
  const {userId , password} = req.body;
  if (!userId || !password) {
    res
      .status(400)
      .json({ succes: false, message: "information is incomplete" });
  }   
  const result = await lookFor(userId, password);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
}

export default checkUser;
