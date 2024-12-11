const express = require("express");
const app = express();
const mongoose = require("mongoose");

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log("db connected")
}

app.listen(5000, () => {
  console.log("listening on port 5000");
});
