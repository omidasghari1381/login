//usermodel
import user from "../models/user.js";
//hash password
import hashPassword from "../middleware/hashps.js";

async function register(req, res) {
  try {
    req.body.password = await hashPassword(req.body.password);
    const newUser = new user(req.body);
    await newUser.save();
    console.log("user saved");
    res.send(newUser).status(200);
  } catch (error) {
    console.log(error);
    res.status(409).send("user already exists");
  }
}

export default register;
