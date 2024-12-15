//import express
import express from "express";
const router = express.Router();

//import db
import user from "../models/user.js";

//add bcrypt
import bcrypt from "bcrypt";

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

router.post("/register", async (req, res) => {
  req.body.password = await hashPassword(req.body.password);
  console.log(req.body.password);
  const newUser = new user(req.body);
  await newUser.save();
  console.log("user saved");
  res.send(newUser);
});

export default router;
