//db
import { Schema, model } from "mongoose";
//validateEmail
import validateEmail from "../middleware/validateEmail.js";

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 3,
    maxlenth: 20,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlenth: 320,
    require: true,
    validate: [validateEmail, "please enter your email properly"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 60,
    maxlenth: 60,
    require: true,
  },
  phone: {
    type: String,
    minlength: 11,
    maxlenth: 13,
    require: true,
    validate: /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/,
    unique: true,
  },
  token:{
    type: String,
  },
  exToken:{
    type:Date,
    require:true,
  }
});

const User = model("userName", userSchema);

export default User;
