import { Schema, model } from "mongoose";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
};
const userSchema = new Schema({
  username: {
    type: String,
    minlength: 3,
    maxlenth: 20,
    require: true,
  },
  email: {
    type: String,
    minlength: 3,
    maxlenth: 320,
    require: true,
    validate: [validateEmail, "please enter your email properly"],
  },
  password: {
    type: String,
    minlength: 8,
    maxlenth: 60,
    require: true,
  },
  phone: {
    type: String,
    minlength: 11,
    maxlenth: 13,
    require: true,
    validate: /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/,
  },
});

const User = model("userName", userSchema);

export default User;
