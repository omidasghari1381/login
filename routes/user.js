//import express
import express from "express";
const router = express.Router();

//import db
import user from "../models/user.js";

router.post("/register", async (req, res) => {
  const newUser = new user(req.body)
  await newUser.save()
  console.log("user saved")
  res.send(newUser)
});

export default router;
