const express = require("express");
const app = express();


app.listen(5000, () => {
  console.log("listening on port 5000");
});

const loggingRouter = require("./routes/logging");
app.use('/logging', loggingRouter);
