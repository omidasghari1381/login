//express
import express from "express";
const app = express();
app.use(express.json());

//Dotenv
import "dotenv/config";

//DataBase
import mongoose from "mongoose";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_Name}`);
  console.log("db connected");
}

//listener
app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});

//userrouter
import router from "./routes/user.js";

//auth
import auth from "./middleware/auth.js"

app.use(auth)
app.use("/user", router);

