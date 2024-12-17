//express
import express from "express";
const router = express.Router();
//login
import checkUser from "../controllers/login.js";
//register
import register from "../controllers/register.js";

router.post("/register", register);
router.post("/login", checkUser);
router.get("/",(req,res)=>{
    res.send(req.user)
})

export default router;
