//usermodel
import user from "../models/user.js";
//hash password
import hashPassword from "../middleware/hashps.js";
//joi
import Joi from "joi";
//passwordcomplexity
import passwordComplexity from "joi-password-complexity";

async function register(req, res) {
  try {
    const complexityOption = {
      min: 5,
      max: 32,
      loweCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementcount: 2,
    };
    const userSchema = Joi.object({
      username: Joi.string().min(3).max(20).required(),
      email: Joi.string()
        .min(3)
        .max(320)
        .required()
        .pattern(
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        ),
      phone: Joi.string()
        .min(11)
        .max(11)
        .required()
        .pattern(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/),
      password: passwordComplexity(complexityOption).required(),
    });
    const userValidation = userSchema.validate(req.body);
    if (userValidation.error){
      return res.status(401).send(userValidation.error.details.map(detail => detail.message))
    }
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
