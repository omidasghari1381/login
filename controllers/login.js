//usermodel
import user from "../models/user.js";

//bcrypt
import bcrypt from "bcrypt";

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
    console.log("login succesfully");
    return { success: true, message: "login succesfully", User };
  } catch (error) {
    console.error(error);
    return { success: false, message: "login failed" };
  }
}

function checkUser(req, res) {
  const userId = req.body.userId;
  const password = req.body.password;
  if (!userId || !password) {
    res
      .status(400)
      .json({ succes: false, message: "information is incomplete" });
  } else {
    res.send(lookFor(userId, password));
  }
}

export default checkUser;
