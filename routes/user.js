//express
import express from "express";
const router = express.Router();

//db
import user from "../models/user.js";

import hashPassword from "../middleware/hashps.js";

router.post("/register", async (req, res) => {
  req.body.password = await hashPassword(req.body.password);
  const newUser = new user(req.body);
  await newUser.save();
  console.log("user saved");
  res.send(newUser);
});

export default router;
