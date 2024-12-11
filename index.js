import express from "express";
const app = express();

import { connect } from "mongoose";

import 'dotenv/config'

main().catch(err => console.log(err));
async function main() {
  await connect(`mongodb://127.0.0.1:27017/${process.env.DB_Name}`);
  console.log("db connected")
}

import UserName from './models/auth';
const mamad = new UserName({ username : 'mamad' ,email : '123465mamad' , password : '12345' , phone : 123456})
await mamad.save();

const users = await UserName.find();
console.log(users);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});
